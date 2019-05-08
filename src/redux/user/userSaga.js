import { all, take, put, fork, call, select, cancel } from "redux-saga/effects";

import * as userActions from "./userActions";
import { getAllProjectsRequest } from "../projects/projectsActions.js";
import { apiLogin, apiSignup, apiLogout } from "../../utils/apiRequests";
import { setAuthToken, removeAuthToken } from "../../utils/authUtils";

function parseError(error) {
  const message = error.response
    ? error.response.data.message
    : "Unknown error";
  let extraData = {};
  if (
    error.response &&
    error.response.data.errors &&
    Object.keys(error.response.data.errors).length > 0
  ) {
    extraData = error.response.data.errors;
  }
  return { message, extraData };
}

function* saveUserAndNotify(user, token, expiresAt) {
  yield call(setAuthToken, token, expiresAt);
  yield put(userActions.loginSuccess(user, token, expiresAt));
  yield put(getAllProjectsRequest());
}

function* authorize(email, password) {
  try {
    const response = yield call(apiLogin, email, password, true);
    const tokenExpiresAt = response.expiresIn + Math.round(Date.now() / 1000);
    yield call(
      saveUserAndNotify,
      response.user,
      response.accessToken,
      tokenExpiresAt
    );
  } catch (error) {
    const { message, extraData } = parseError(error);
    yield put(userActions.loginFailure(message, extraData));
  }
}

function* deauthorize() {
  try {
    const { token } = yield select(state => state.user);
    yield call(apiLogout, token);
    yield put(userActions.logoutSuccess());
  } catch (error) {
    const { message, extraData } = parseError(error);
    yield put(userActions.logoutFailure(message, extraData));
  }
}

function* signup(name, email, password, passwordConfirmation) {
  try {
    const response = yield call(
      apiSignup,
      name,
      email,
      password,
      passwordConfirmation
    );
    const tokenExpiresAt = response.expiresIn + Math.round(Date.now() / 1000);
    yield put(userActions.signupSuccess(response.user));
    yield call(
      saveUserAndNotify,
      response.user,
      response.accessToken,
      tokenExpiresAt
    );
  } catch (error) {
    const { message, extraData } = parseError(error);
    yield put(userActions.signupFailure(message, extraData));
  }
}

function* loginFlow() {
  while (true) {
    const signInAction = yield take([
      userActions.LOGIN_REQUEST,
      userActions.SIGNUP_REQUEST,
      userActions.SAVE_USER
    ]);
    let task;
    if (signInAction.type === userActions.LOGIN_REQUEST) {
      const { email, password } = signInAction;
      task = yield fork(authorize, email, password);
    } else if (signInAction.type === userActions.SIGNUP_REQUEST) {
      const { name, email, password, passwordConfirmation } = signInAction;
      task = yield fork(signup, name, email, password, passwordConfirmation);
    } else {
      const { user, token, expiresAt } = signInAction;
      yield call(saveUserAndNotify, user, token, expiresAt);
    }
    const action = yield take([
      userActions.LOGIN_FAILURE,
      userActions.LOGOUT_REQUEST,
      userActions.SIGNUP_FAILURE
    ]);
    if (action.type === userActions.LOGOUT_REQUEST) {
      if (task) {
        yield cancel(task);
      }
      yield call(deauthorize);
    }
    yield call(removeAuthToken);
  }
}

export default function* userSaga() {
  yield all([fork(loginFlow)]);
}
