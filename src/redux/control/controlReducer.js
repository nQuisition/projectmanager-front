import { createReducer } from "../../utils/reducerUtils";
import * as controlActions from "./controlActions";
import * as projectsActions from "../projects/projectsActions";
import * as userActions from "../user/userActions";

const createLoadingStateHandlers = (statePropName, requestEventName) => {
  const baseEventName = requestEventName.substring(
    0,
    requestEventName.lastIndexOf("_") + 1
  );
  return {
    [requestEventName]: state => ({ ...state, [statePropName]: true }),
    [`${baseEventName}SUCCESS`]: state => ({
      ...state,
      [statePropName]: false
    }),
    [`${baseEventName}FAILURE`]: state => ({
      ...state,
      [statePropName]: false
    })
  };
};

const isFetchingProjects = "isFetchingProjects";
const isSigningIn = "isSigningIn";
const isSigningOut = "isSigningOut";

const initialState = {
  initialized: false,
  [isFetchingProjects]: false,
  [isSigningIn]: false,
  [isSigningOut]: false
};

function appInitialized(state, action) {
  return { ...state, initialized: true };
}

const reducer = createReducer(initialState, {
  [controlActions.APP_INIT_SUCCESS]: appInitialized,
  ...createLoadingStateHandlers(
    isFetchingProjects,
    projectsActions.GET_ALL_PROJECTS_REQUEST
  ),
  ...createLoadingStateHandlers(isSigningIn, userActions.LOGIN_REQUEST),
  ...createLoadingStateHandlers(isSigningIn, userActions.SIGNUP_REQUEST),
  ...createLoadingStateHandlers(isSigningOut, userActions.LOGOUT_REQUEST)
});

export default reducer;
