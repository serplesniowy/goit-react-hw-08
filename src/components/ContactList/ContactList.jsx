import React from "react";
import Contact from "../ContactItem";
import styles from "./ContactList.module.css";

const ContactList = ({ contacts, onDeleteContact, onEditContact }) => {
  return (
    <div className={styles.contactList}>
      {contacts.map((contact) => (
        <Contact
          key={contact.id}
          contact={contact}
          onDelete={() => onDeleteContact(contact)}
          onEdit={() => onEditContact(contact)}
        />
      ))}
    </div>
  );
};

export default ContactList;
