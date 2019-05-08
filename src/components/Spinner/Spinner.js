import React from "react";
import PropTypes from "prop-types";

import styles from "./Spinner.module.scss";

export const SIZES = {
  TINY: "tiny",
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
};

export const POSITIONING = {
  RELATIVE: "relative",
  ABSOLUTE: "absolute"
};

function Spinner({ spinnerSize, positioning, isWhite }) {
  const classList = [
    styles.spinner,
    styles[spinnerSize],
    styles[positioning],
    isWhite ? styles.white : ""
  ];
  return <div className={classList.join(" ")} />;
}

Spinner.propTypes = {
  spinnerSize: PropTypes.oneOf(Object.keys(SIZES).map(k => SIZES[k])),
  positioning: PropTypes.oneOf(
    Object.keys(POSITIONING).map(k => POSITIONING[k])
  ),
  isWhite: PropTypes.bool
};

Spinner.defaultProps = {
  spinnerSize: SIZES.MEDIUM,
  positioning: POSITIONING.RELATIVE,
  isWhite: false
};

export default Spinner;
