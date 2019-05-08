export const GET_ALL_PROJECTS_REQUEST = "GET_ALL_PROJECTS_REQUEST";
export const GET_ALL_PROJECTS_SUCCESS = "GET_ALL_PROJECTS_SUCCESS";
export const GET_ALL_PROJECTS_FAILURE = "GET_ALL_PROJECTS_FAILURE";

export const GET_PROJECT_REQUEST = "GET_PROJECT_REQUEST";
export const GET_PROJECT_SUCCESS = "GET_PROJECT_SUCCESS";
export const GET_PROJECT_FAILURE = "GET_PROJECT_FAILURE";

export const CREATE_PROJECT_REQUEST = "CREATE_PROJECT_REQUEST";
export const CREATE_PROJECT_SUCCESS = "CREATE_PROJECT_SUCCESS";
export const CREATE_PROJECT_FAILURE = "CREATE_PROJECT_FAILURE";

export const DELETE_PROJECT_REQUEST = "DELETE_PROJECT_REQUEST";
export const DELETE_PROJECT_SUCCESS = "DELETE_PROJECT_SUCCESS";
export const DELETE_PROJECT_FAILURE = "DELETE_PROJECT_FAILURE";

export function getAllProjectsRequest() {
  return {
    type: GET_ALL_PROJECTS_REQUEST
  };
}

export function getAllProjectsSuccess(projects) {
  return {
    type: GET_ALL_PROJECTS_SUCCESS,
    projects
  };
}

export function getAllProjectsFailure(error, extraData) {
  return {
    type: GET_ALL_PROJECTS_FAILURE,
    error,
    extraData
  };
}

export function getProjectRequest(id) {
  return {
    type: GET_PROJECT_REQUEST,
    id
  };
}

export function getProjectSuccess(project) {
  return {
    type: GET_PROJECT_SUCCESS,
    project
  };
}

export function getProjectFailure(error, extraData) {
  return {
    type: GET_PROJECT_FAILURE,
    error,
    extraData
  };
}

export function createProjectRequest(name, description) {
  return {
    type: CREATE_PROJECT_REQUEST,
    name,
    description
  };
}

export function createProjectSuccess(project) {
  return {
    type: CREATE_PROJECT_SUCCESS,
    project
  };
}

export function createProjectFailure(error, extraData) {
  return {
    type: CREATE_PROJECT_FAILURE,
    error,
    extraData
  };
}

export function deleteProjectRequest(projectId) {
  return {
    type: DELETE_PROJECT_REQUEST,
    projectId
  };
}

export function deleteProjectSuccess(projectId) {
  return {
    type: DELETE_PROJECT_SUCCESS,
    projectId
  };
}

export function deleteProjectFailure(projectId, error, extraData) {
  return {
    type: DELETE_PROJECT_FAILURE,
    projectId,
    error,
    extraData
  };
}
