import React from "react";
import styled from "./Alert.module.css";
import PropTypes from "prop-types";

const Alert = ({ alertMessage }) => (
  <div className={styled.alert}>{alertMessage}</div>
);

export default Alert;

Alert.propTypes = {
  alertMessage: PropTypes.string.isRequired,
};
