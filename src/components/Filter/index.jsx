import React from "react";
import styled from "./Filter.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";

const Filter = ({ onChange, value }) => (
  <div className={styled.filter}>
    <p>Find contacts by name</p>
    <input
      type="text"
      name="filter"
      className={classNames(styled.input)}
      onChange={onChange}
      value={value}
    />
  </div>
);

export default Filter;

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
