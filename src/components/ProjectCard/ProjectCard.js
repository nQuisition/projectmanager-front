import React from "react";
import PropTypes from "prop-types";

import styles from "./ProjectCard.module.scss";
import boxStyles from "../Elements/Box.module.scss";
import { getDateDelta } from "../../utils/utils";
import BareButton from "../Elements/BareButton";
import * as Icon from "../Elements/Icon";

class ProjectCard extends React.Component {
  handleDeleteClick = e => {
    e.preventDefault();
    this.props.onDeleteClicked && this.props.onDeleteClicked(this.props.id);
  };

  handleStarClick = e => {
    e.preventDefault();
    this.props.onStarClicked && this.props.onStarClicked(this.props.id);
  };

  handleExtraClick = e => {
    e.preventDefault();
    this.props.onExtraClicked && this.props.onExtraClicked(this.props.id);
  };

  render() {
    const { id, title, description, image, createdAtTimestamp } = this.props;
    const created = getDateDelta(createdAtTimestamp);
    return (
      <div className={[styles.projectCard, boxStyles.baseBox].join(" ")}>
        <div className={styles.title}>
          <h3>{title}</h3>
          <div className={styles.iconsContainer}>
            <BareButton
              innerComponent={<Icon.Trash />}
              extraClass={styles.icon}
              onClick={this.handleDeleteClick}
              tooltip="Delete this project"
            />
            <BareButton
              innerComponent={<Icon.Star />}
              extraClass={styles.icon}
              onClick={this.handleStarClick}
              tooltip="Favourite this project"
            />
            <BareButton
              innerComponent={<Icon.Dots />}
              extraClass={styles.icon}
              onClick={this.handleExtraClick}
              tooltip="More options"
            />
          </div>
        </div>
        <div className={styles.description}>{description}</div>
        <div className={styles.footer}>{`Created ${created} ago`}</div>
      </div>
    );
  }
}

export default ProjectCard;
