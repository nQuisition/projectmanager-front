import { createReducer } from "../../utils/reducerUtils";
import * as projectsActions from "./projectsActions";
import { LOGOUT_SUCCESS } from "../user/userActions";
import { dateToTimestamp } from "../../utils/utils";

const initialState = {
  projectsById: {},
  projectIds: []
};

function reset() {
  return { ...initialState };
}

function allProjectsFetched(state, action) {
  // TODO merge projectsById instead of overwriting?
  const projectsById = action.projects.reduce((obj, project) => {
    const resultingProject = state.projectsById[project.id]
      ? {
          ...state.projectsById[project.id],
          ...project,
          meta: state.projectsById[project.id].meta
        }
      : project;
    obj[project.id] = resultingProject;
    return obj;
  }, {});

  return {
    ...state,
    projectsById,
    projectIds: action.projects
      .sort(
        (a, b) => dateToTimestamp(b.updatedAt) - dateToTimestamp(a.updatedAt)
      )
      .map(project => project.id)
  };
}

function singleProjectFetched(state, action) {
  const { project } = action;
  const { id } = project;

  // TODO check if project didn't change?
  // TODO ordering
  return {
    ...state,
    projectsById: {
      ...state.projectsById,
      [id]: project
    }
    /* projectIds: state.projectIds.includes(id)
      ? state.projectIds
      : [...state.projectIds, id] */
  };
}

function projectCreated(state, action) {
  const { project } = action;

  // TODO ordering
  return {
    ...state,
    projectsById: {
      ...state.projectsById,
      [project.id]: project
    },
    projectIds: [project.id, ...state.projectIds]
  };
}

function projectDeleteRequested(state, action) {
  const { projectId } = action;
  const curProject = state.projectsById[projectId];

  return {
    ...state,
    projectsById: {
      ...state.projectsById,
      [projectId]: {
        ...curProject,
        meta: {
          ...curProject.meta,
          isDeleting: true
        }
      }
    }
  };
}

function projectDeleted(state, action) {
  const { projectId } = action;
  const { [projectId]: omit, ...newProjectsById } = state.projectsById;
  const index = state.projectIds.indexOf(projectId);
  const newProjectIds =
    index >= 0
      ? [
          ...state.projectIds.slice(0, index),
          ...state.projectIds.slice(index + 1)
        ]
      : state.projectIds;

  return {
    ...state,
    projectsById: newProjectsById,
    projectIds: newProjectIds
  };
}

function projectDeleteFailed(state, action) {
  const { projectId } = action;
  const curProject = state.projectsById[projectId];

  return {
    ...state,
    projectsById: {
      ...state.projectsById,
      [projectId]: {
        ...curProject,
        meta: {
          ...curProject.meta,
          isDeleting: false
        }
      }
    }
  };
}

const reducer = createReducer(initialState, {
  [projectsActions.GET_ALL_PROJECTS_SUCCESS]: allProjectsFetched,
  [projectsActions.GET_PROJECT_SUCCESS]: singleProjectFetched,
  [projectsActions.CREATE_PROJECT_SUCCESS]: projectCreated,
  [projectsActions.DELETE_PROJECT_REQUEST]: projectDeleteRequested,
  [projectsActions.DELETE_PROJECT_SUCCESS]: projectDeleted,
  [projectsActions.DELETE_PROJECT_FAILURE]: projectDeleteFailed,
  [LOGOUT_SUCCESS]: reset
});

export default reducer;
