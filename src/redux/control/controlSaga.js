import { all, take, put, fork, call } from "redux-saga/effects";

import * as controlActions from "./controlActions";
import { saveUser } from "../user/userActions";
import { apiSelfInfo } from "../../utils/apiRequests";
import { getAuthToken } from "../../utils/authUtils";

function* initApp() {
  yield take(controlActions.APP_INIT);
  const { token, expiresAt } = yield call(getAuthToken);
  if (token && expiresAt > Math.round(Date.now() / 1000)) {
    // TODO try/catch, if this fails with 403 our token has expired
    const user = yield call(apiSelfInfo, token);
    yield put(saveUser(user, token, expiresAt));
  }
  yield put(controlActions.appInitSuccess());
}

export default function* controlSaga() {
  yield all([fork(initApp)]);
}
