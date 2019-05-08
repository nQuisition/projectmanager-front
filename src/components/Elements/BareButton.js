import React from "react";
import PropTypes from "prop-types";

// TODO accessibility
function BareButton({ innerComponent, onClick, extraClass, tooltip }) {
  return (
    <div className={extraClass || ""} onClick={onClick} title={tooltip}>
      {innerComponent}
    </div>
  );
}

BareButton.propTypes = {
  innerComponent: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  extraClass: PropTypes.string,
  tooltip: PropTypes.string
};

BareButton.defaultProps = {
  extraClass: "",
  tooltip: ""
};

export default BareButton;
