import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import slideTransition from "../../transitions/slideFromLeft.module.css";

import styled from "./ContactList.module.css";
import PropTypes from "prop-types";
import classNames from "classnames";

const ContactList = ({ contacts, filter, deleteContact }) => (
  <TransitionGroup component="ul" className={styled.list}>
    {contacts.map((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ? (
        <CSSTransition
          key={contact.id}
          timeout={250}
          classNames={slideTransition}
        >
          <li className={classNames(styled.li)}>
            <span className={classNames(styled.span)}>
              {contact.name}: {contact.number}
            </span>
            <button
              name={contact.id}
              onClick={deleteContact}
              className={classNames(styled.button)}
            >
              Delete
            </button>
          </li>
        </CSSTransition>
      ) : null
    )}
  </TransitionGroup>
);

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  filter: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};
