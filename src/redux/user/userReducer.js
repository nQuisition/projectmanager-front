import { createReducer } from "../../utils/reducerUtils";
import * as userActions from "./userActions";

const initialState = {
  user: null,
  token: null,
  tokenExpires: null,
  signingIn: false,
  loggedIn: false,
  errors: {}
};

function userLoggedIn(state, action) {
  const { user, token, tokenExpires } = action;
  return {
    ...state,
    user,
    token,
    tokenExpires,
    loggedIn: true,
    errors: {}
  };
}

function loginError(state, action) {
  const { error, extraData } = action;
  return {
    ...state,
    errors: { ...state.errors, login: { message: error, extraData } }
  };
}

function signupError(state, action) {
  const { error, extraData } = action;
  return {
    ...state,
    errors: { ...state.errors, signup: { message: error, extraData } }
  };
}

function userLoggedOut(state, action) {
  return initialState;
}

const reducer = createReducer(initialState, {
  [userActions.LOGIN_SUCCESS]: userLoggedIn,
  [userActions.LOGIN_FAILURE]: loginError,
  [userActions.SIGNUP_FAILURE]: signupError,
  [userActions.LOGOUT_SUCCESS]: userLoggedOut
});

export default reducer;
