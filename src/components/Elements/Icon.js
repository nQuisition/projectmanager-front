import React from "react";
import PtopTypes from "prop-types";

import * as styles from "./Icon.module.scss";

export const SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
};

function Icon({ name, size, extraClass }) {
  return (
    <i
      className={`fas fa-${name} ${styles.icon} ${extraClass || ""} ${
        styles[size]
      }`}
    />
  );
}

Icon.defaultProps = {
  size: SIZES.MEDIUM,
  extraClass: ""
};

export const Trash = props => <Icon {...props} name="trash-alt" />;

export const Star = props => <Icon {...props} name="star" />;

export const Dots = props => <Icon {...props} name="ellipsis-h" />;
