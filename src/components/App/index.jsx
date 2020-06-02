import React, { Component } from "react";
import { v4 } from "uuid";

import Filter from "../Filter";
import ContactForm from "../ContactForm";
import ContactList from "../ContactList";

export default class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
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
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm
          addContact={this.addContact}
          contacts={this.state.contacts}
        />

        <h2>Contacts</h2>

        {this.state.contacts.length > 1 ? (
          <Filter onChange={this.handleChange} value={this.state.filter} />
        ) : null}

        <ContactList
          contacts={this.state.contacts}
          filter={this.state.filter}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}
