import { all, take, put, fork, call, select } from "redux-saga/effects";

import * as projectsActions from "./projectsActions";
import {
  apiGetProjects,
  apiGetProject,
  apiCreateProject,
  apiDeleteProject
} from "../../utils/apiRequests";

function* projectsFlow() {
  while (true) {
    yield take(projectsActions.GET_ALL_PROJECTS_REQUEST);
    const { token, tokenExpires } = yield select(state => state.user);
    // TODO refresh token if expired
    const projects = yield call(apiGetProjects, token);
    yield put(
      projectsActions.getAllProjectsSuccess(
        projects.map(project => ({
          ...project,
          meta: { isFullyLoaded: false, isDeleting: false }
        }))
      )
    );
  }
}

function* singleProjectFlow() {
  while (true) {
    const { id } = yield take(projectsActions.GET_PROJECT_REQUEST);
    // TODO need to refresh the cache from time to time or on websocket message
    let project = yield select(state => state.projects.projectsById[id]);
    try {
      if (!project || !project.meta.isFullyLoaded) {
        const { token, tokenExpires } = yield select(state => state.user);
        project = yield call(apiGetProject, token, id);
        project.meta = { isFullyLoaded: true };
      }
      yield put(projectsActions.getProjectSuccess(project));
    } catch (error) {
      //TODO panic!
    }
  }
}

function* projectCreateFlow() {
  while (true) {
    const { name, description } = yield take(
      projectsActions.CREATE_PROJECT_REQUEST
    );
    const { token, tokenExpires } = yield select(state => state.user);
    try {
      const response = yield call(apiCreateProject, token, name, description);
      const project = {
        ...response.project,
        meta: { isFullyLoaded: false, isDeleting: false }
      };
      yield put(projectsActions.createProjectSuccess(project));
    } catch (error) {
      // TODO panic!!!
    }
  }
}

function* deleteProject(projectId) {
  const { token, tokenExpires } = yield select(state => state.user);
  try {
    const response = yield call(apiDeleteProject, token, projectId);
    yield put(projectsActions.deleteProjectSuccess(projectId));
  } catch (error) {
    yield put(
      projectsActions.deleteProjectFailure(projectId, error.message, null)
    );
  }
}

function* projectDeleteFlow() {
  while (true) {
    // TODO ignore multiple calls to delete same id
    const { projectId } = yield take(projectsActions.DELETE_PROJECT_REQUEST);
    yield fork(deleteProject, projectId);
  }
}

export default function* projectsSaga() {
  yield all([
    fork(projectsFlow),
    fork(singleProjectFlow),
    fork(projectCreateFlow),
    fork(projectDeleteFlow)
  ]);
}
