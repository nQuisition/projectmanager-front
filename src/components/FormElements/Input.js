import React from "react";
import PropTypes from "prop-types";

import styles from "./Input.module.scss";
import formStyles from "../Forms/Form.module.scss";
import allowNull from "../../utils/customValidators";

function Input({
  type,
  title,
  name,
  value,
  isRequired,
  isError,
  isComplete,
  placeholder,
  innerAnnotation,
  annotation,
  handleChange,
  handleFocus,
  handleBlur
}) {
  return (
    <div className={formStyles.groupContainer}>
      <div>
        <div className={formStyles.formLabel}>{title}</div>
        <div
          className={[
            styles.inputWrapper,
            isRequired ? styles.required : "",
            isError ? styles.error : "",
            isComplete ? styles.complete : ""
          ].join(" ")}
        >
          <input
            className={[
              styles.formInput,
              innerAnnotation && innerAnnotation !== "" ? styles.active : ""
            ].join(" ")}
            id={name}
            name={name}
            type={type}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <span
            className={[
              styles.placeholder,
              innerAnnotation && innerAnnotation !== "" ? styles.active : ""
            ].join(" ")}
          >
            {innerAnnotation}
          </span>
        </div>
      </div>
      <div className={styles.formInputAnnotation}>
        {annotation ? annotation.text : ""}
      </div>
    </div>
  );
}

Input.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  isError: PropTypes.bool,
  placeholder: PropTypes.string,
  annotation: allowNull(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.string,
      icon: PropTypes.string
    })
  ),
  handleChange: PropTypes.func.isRequired,
  handleFocus: allowNull(PropTypes.func),
  handleBlur: allowNull(PropTypes.func)
};

Input.defaultProps = {
  type: "text",
  isRequired: true,
  isError: false,
  placeholder: "",
  annotation: null,
  handleFocus: null,
  handleBlur: null
};

export default Input;
