import { connect } from "react-redux";

import Dashboard from "./Dashboard";
import { logoutRequest } from "../../redux/user/userActions";
import {
  createProjectRequest,
  deleteProjectRequest
} from "../../redux/projects/projectsActions";

const mapStateToProps = state => ({
  active: state.control.initialized && state.user.loggedIn,
  user: state.user.user,
  // TODO reselect
  projects: state.projects.projectIds.map(
    id => state.projects.projectsById[id]
  ),
  isFetchingProjects: state.control.isFetchingProjects,
  isSigningOut: state.control.isSigningOut
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logoutRequest()),
  createProjectClicked: () =>
    dispatch(createProjectRequest("Tester", "Some kind of tester project!")),
  deleteProject: id => dispatch(deleteProjectRequest(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
