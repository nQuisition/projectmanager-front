import React from "react";
import PropTypes from "prop-types";

import * as styles from "./ProjectBoard.module.scss";
import Spinner, { SIZES as SPINNER_SIZES } from "../Spinner/Spinner";

class ProjectBoard extends React.Component {
  componentDidMount() {
    const { requestProject } = this.props;
    const projectId = this.props.routeProjectId;
    if (projectId && requestProject) {
      requestProject(projectId);
    }
  }
  render() {
    const { project } = this.props;
    if (!project) {
      return <Spinner spinnerSize={SPINNER_SIZES.LARGE} />;
    }
    const tags =
      project.tags &&
      project.tags.map(tag => <div key={tag.id}>{tag.name}</div>);
    return (
      <div>
        <h1>{project.name}</h1>
        <p>{project.description}</p>
        {tags || <Spinner spinnerSize={SPINNER_SIZES.MEDIUM} />}
      </div>
    );
  }
}

export default ProjectBoard;
