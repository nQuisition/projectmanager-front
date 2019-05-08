import { combineReducers } from "redux";

import user from "./user/userReducer";
import control from "./control/controlReducer";
import projects from "./projects/projectsReducer";

export default combineReducers({
  user,
  control,
  projects
});
