import React from "react";
import styled from "./Filter.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";

const Filter = ({ onChange, value }) => (
  <>
    <p>Find contacts by name</p>
    <input
      type="text"
      name="filter"
      className={classNames(styled.input)}
      onChange={onChange}
      value={value}
    />
  </>
);

export default Filter;

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
