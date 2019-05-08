import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import * as styles from "./ProjectCardGrid.module.scss";
import Spinner, {
  SIZES as SPINNER_SIZES,
  POSITIONING as SPINNER_POSITIONING
} from "../Spinner/Spinner";
import ProjectCard from "./ProjectCard";
import NewProjectCard from "./NewProjectCard";
import { dateToTimestamp } from "../../utils/utils";

function ProjectCardGrid({
  projects,
  isFetchingProjects,
  createProjectClicked,
  deleteProjectClicked
}) {
  let projectCards;
  if (!isFetchingProjects) {
    projectCards = projects.map(project => (
      <div key={project.id} className={styles.projectCardContainer}>
        {project.meta.isDeleting && (
          <div className={styles.cover}>
            <Spinner
              spinnerSize={SPINNER_SIZES.LARGE}
              positioning={SPINNER_POSITIONING.ABSOLUTE}
              isWhite
            />
          </div>
        )}
        <Link to={`/project/${project.id}`}>
          <ProjectCard
            id={project.id}
            title={project.name}
            description={project.description}
            image={project.avatar}
            createdAtTimestamp={dateToTimestamp(project.createdAt)}
            onDeleteClicked={deleteProjectClicked}
          />
        </Link>
      </div>
    ));
    projectCards.push(
      <div key="newCard" className={styles.projectCardContainer}>
        <NewProjectCard onClick={createProjectClicked} />
      </div>
    );
  }
  return (
    <div className={styles.projectCardGrid}>
      {isFetchingProjects ? (
        <Spinner spinnerSize={SPINNER_SIZES.LARGE} />
      ) : (
        projectCards
      )}
    </div>
  );
}

export default ProjectCardGrid;
