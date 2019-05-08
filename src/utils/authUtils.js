export function getAuthToken() {
  return {
    token: JSON.parse(localStorage.getItem("authToken")),
    expiresAt: JSON.parse(localStorage.getItem("authTokenExpiresAt"))
  };
}

export function setAuthToken(token, expiresAt) {
  localStorage.setItem("authToken", JSON.stringify(token));
  localStorage.setItem("authTokenExpiresAt", JSON.stringify(expiresAt));
}

export function removeAuthToken() {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authTokenExpiresAt");
}
