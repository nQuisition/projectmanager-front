export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const SAVE_USER = "SAVE_USER";

export function loginRequest(email, password) {
  return {
    type: LOGIN_REQUEST,
    email,
    password
  };
}

export function loginSuccess(user, token, tokenExpires) {
  return {
    type: LOGIN_SUCCESS,
    user,
    token,
    tokenExpires
  };
}

export function loginFailure(error, extraData) {
  return {
    type: LOGIN_FAILURE,
    error,
    extraData
  };
}

export function signupRequest(name, email, password, passwordConfirmation) {
  return {
    type: SIGNUP_REQUEST,
    name,
    email,
    password,
    passwordConfirmation
  };
}

export function signupSuccess() {
  return {
    type: SIGNUP_SUCCESS
  };
}

export function signupFailure(error, extraData) {
  return {
    type: SIGNUP_FAILURE,
    error,
    extraData
  };
}

export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

export function logoutFailure(error, extraData) {
  return {
    type: LOGOUT_FAILURE,
    error,
    extraData
  };
}

export function saveUser(user, token, expiresAt) {
  return {
    type: SAVE_USER,
    user,
    token,
    expiresAt
  };
}
