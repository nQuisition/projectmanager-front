import React from "react";
import PropTypes from "prop-types";

import styles from "./Button.module.scss";
import allowNull from "../../utils/customValidators";

const TYPES = {
  PRIMARY: "primary",
  WARNING: "warning",
  DANGER: "danger",
  SUCCESS: "success"
};

export const SIZES = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large"
};

function Button({
  text,
  innerComponent,
  type,
  onClick,
  disabled,
  buttonType,
  buttonSize,
  extraClass
}) {
  return (
    <button
      className={[
        extraClass,
        styles.button,
        styles[buttonType],
        styles[buttonSize],
        disabled && !!innerComponent ? styles.transparentText : null
      ].join(" ")}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
      {innerComponent}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  innerComponent: allowNull(PropTypes.node),
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  buttonType: PropTypes.oneOf(Object.keys(TYPES).map(k => TYPES[k])),
  buttonSize: PropTypes.oneOf(Object.keys(SIZES).map(k => SIZES[k])),
  extraClass: PropTypes.string
};

Button.defaultProps = {
  text: "",
  innerComponent: null,
  type: "button",
  disabled: false,
  buttonType: TYPES.PRIMARY,
  buttonSize: SIZES.MEDIUM,
  extraClass: ""
};

export const Primary = props => (
  <Button {...props} buttonType={TYPES.PRIMARY} />
);

export const Warning = props => (
  <Button {...props} buttonType={TYPES.WARNING} />
);

export const Danger = props => <Button {...props} buttonType={TYPES.DANGER} />;

export const Success = props => (
  <Button {...props} buttonType={TYPES.SUCCESS} />
);
