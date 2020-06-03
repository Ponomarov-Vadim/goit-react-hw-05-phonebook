import React, { Component } from "react";
import styled from "./ContactForm.module.css";
import { CSSTransition } from "react-transition-group";
import slideTransition from "../../transitions/slideFromRight.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";
import Alert from "../Alert";

const initialState = {
  name: "",
  number: "",
};

const isTelNumber = (tel) => !Number.isNaN(Number(tel.split("-").join("")));

export default class ContactForm extends Component {
  state = { ...initialState, alertMessage: "" };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const { contacts, addContact } = this.props;
    if (contacts.find((contact) => contact.name === name) === undefined) {
      if (isTelNumber(number)) {
        addContact(name, number);
      } else {
        this.setState({
          alertMessage: `${number} is incorrect telephone number!`,
        });
      }
    } else {
      this.setState({
        alertMessage: `${name} alredy exist!`,
      });
    }
    this.setState({ ...initialState });

    setTimeout(() => this.setState({ alertMessage: "" }), 2000);
  };

  render() {
    const { number, name, alertMessage } = this.state;
    return (
      <>
        <CSSTransition
          in={!!alertMessage}
          timeout={250}
          classNames={slideTransition}
          unmountOnExit
        >
          <Alert alertMessage={alertMessage} />
        </CSSTransition>
        <form onSubmit={this.handleSubmit} className={classNames(styled.form)}>
          <h3>Name</h3>
          <input
            type="text"
            name="name"
            className={classNames(styled.input)}
            style={{ display: "block", marginBottom: 10 }}
            onChange={this.handleChange}
            value={name}
          />

          <h3>Number</h3>
          <input
            type="text"
            name="number"
            className={classNames(styled.input)}
            onChange={this.handleChange}
            value={number}
          />
          <button type="submit">Add contact</button>
        </form>
      </>
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
