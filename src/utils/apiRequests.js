import axios from "axios";
import humps from "humps";

import config from "../config";

const { apiUrl } = config;

const getAuthHeader = token => ({ Authorization: `Bearer ${token}` });

const api = axios.create({
  baseURL: apiUrl,
  transformRequest: [
    data => humps.decamelizeKeys(data),
    ...axios.defaults.transformRequest
  ],
  transformResponse: [
    ...axios.defaults.transformResponse,
    data => humps.camelizeKeys(data)
  ]
});

export function apiLogin(email, password, rememberMe) {
  return api
    .post("/auth/login", {
      email,
      password,
      remember_me: rememberMe
    })
    .then(res => res.data);
}

export function apiSignup(name, email, password, passwordConfirmation) {
  return api
    .post("/auth/signup", {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation
    })
    .then(res => res.data);
}

export function apiSelfInfo(token) {
  return api
    .get("/auth/user", {
      headers: { ...getAuthHeader(token) }
    })
    .then(res => res.data);
}

export function apiLogout(token) {
  return api
    .get("/auth/logout", {
      headers: { ...getAuthHeader(token) }
    })
    .then(res => res.data);
}

export function apiGetProjects(token) {
  return api
    .get("/projects", {
      headers: { ...getAuthHeader(token) }
    })
    .then(res => res.data);
}

export function apiGetProject(token, id) {
  return api
    .get(`/projects/${id}`, {
      headers: { ...getAuthHeader(token) }
    })
    .then(res => res.data);
}

export function apiCreateProject(token, name, description) {
  return api
    .post(
      "/projects",
      { name, description },
      {
        headers: { ...getAuthHeader(token) }
      }
    )
    .then(res => res.data);
}

export function apiDeleteProject(token, id) {
  return api
    .delete(`/projects/${id}`, {
      headers: { ...getAuthHeader(token) }
    })
    .then(res => res.data);
}
