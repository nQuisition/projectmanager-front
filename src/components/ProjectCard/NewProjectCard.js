import React from "react";
import PropTypes from "prop-types";

import styles from "./ProjectCard.module.scss";
import boxStyles from "../Elements/Box.module.scss";

function NewProjectCard({ onClick }) {
  return (
    <div className={styles.pointer} onClick={onClick}>
      <div className={[styles.projectCard, boxStyles.baseBox].join(" ")}>
        <span className={styles.newCardMessage}>Create new project</span>
      </div>
    </div>
  );
}

export default NewProjectCard;
