import React, { Component } from "react";
import { v4 } from "uuid";
import { CSSTransition } from "react-transition-group";

import popTransition from "../../transitions/pop.module.css";
import slideTransition from "../../transitions/slideFromLeft.module.css";

import Filter from "../Filter";
import ContactForm from "../ContactForm";
import ContactList from "../ContactList";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
    componentDidMount: false,
  };

  componentDidMount() {
    this.setState({
      componentDidMount: true,
    });
    if (!this.state.contacts.length) {
      const contacts = JSON.parse(localStorage.getItem("contacts"));
      if (contacts) {
        this.setState({
          contacts,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  addContact = (name, number) => {
    if (name !== "" && number !== "") {
      this.setState((prevState) => ({
        contacts: [
          ...prevState.contacts,
          { id: v4(), name: name, number: number },
        ],
      }));
      return;
    }
    alert("Name or Number not entered");
  };

  deleteContact = ({ target: { name } }) => {
    this.setState((prevState) => ({
      contacts: [
        ...prevState.contacts.filter((contact) => contact.id !== name),
      ],
    }));
  };

  render() {
    const { contacts, filter, componentDidMount } = this.state;
    return (
      <>
        <CSSTransition
          in={componentDidMount}
          timeout={500}
          classNames={slideTransition}
          unmountOnExit
        >
          <h1>Phonebook</h1>
        </CSSTransition>

        <ContactForm addContact={this.addContact} contacts={contacts} />

        <h2>Contacts</h2>

        <CSSTransition
          in={contacts.length > 1}
          timeout={250}
          classNames={popTransition}
          unmountOnExit
        >
          <Filter onChange={this.handleChange} value={filter} />
        </CSSTransition>

        <ContactList
          contacts={contacts}
          filter={filter}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
