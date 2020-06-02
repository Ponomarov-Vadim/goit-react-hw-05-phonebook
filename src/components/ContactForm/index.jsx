import React, { Component } from "react";
import styled from "./ContactForm.module.css";

import PropTypes from "prop-types";
import classNames from "classnames";

const initialState = {
  name: "",
  number: "",
};

const isTelNumber = (tel) => !Number.isNaN(Number(tel.split("-").join("")));

export default class ContactForm extends Component {
  state = { ...initialState };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    if (
      this.props.contacts.find((contact) => contact.name === name) === undefined
    ) {
      if (isTelNumber(number)) {
        this.props.addContact(name, number);
      } else {
        alert(`"${number}" is incorrect telephone number`);
      }
    } else {
      alert(`"${name}" is alredy in contacts`);
    }

    this.setState({ ...initialState });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={classNames(styled.form)}>
        <h3>Name</h3>
        <input
          type="text"
          name="name"
          className={classNames(styled.input)}
          style={{ display: "block", marginBottom: 10 }}
          onChange={this.handleChange}
          value={this.state.name}
        />

        <h3>Number</h3>
        <input
          type="text"
          name="number"
          className={classNames(styled.input)}
          onChange={this.handleChange}
          value={this.state.number}
        />
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
