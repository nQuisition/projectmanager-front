import { connect } from "react-redux";

import ProjectBoard from "./ProjectBoard";
import * as projectsActions from "../../redux/projects/projectsActions";

const mapDispatchToProps = dispatch => ({
  requestProject: id => dispatch(projectsActions.getProjectRequest(id))
});

export default connect(
  null,
  mapDispatchToProps
)(ProjectBoard);
