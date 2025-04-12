import React, { useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import SearchBox from "./components/SearchBox";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchContacts,
  addContact,
  deleteContact,
} from "./redux/contactsSlice";
import { selectFilteredContacts } from "./redux/selectors";
import { setFilter } from "./redux/filterSlice";
import styles from "./App.module.css";

const App = () => {
  const {
    items: contacts,
    loading,
    error,
  } = useSelector((state) => state.contacts);
  const filter = useSelector((state) => state.filters.name);
  const filteredContacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = (name, number) => {
    const isDuplicate = contacts.some(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isDuplicate) {
      alert("Contact with this name already exists.");
      return;
    }

    dispatch(addContact({ name, number }));
  };
  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id));
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Phonebook</h1>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox value={filter} onChange={handleFilterChange} />
      {loading && <p>Loading contacts...</p>}
      {error && (
        <p>
          Error: {error.message}{" "}
          {error.type === "FETCH_CONTACTS" && " - Failed to fetch contacts."}
          {error.type === "ADD_CONTACT" && " - Failed to add contact."}
          {error.type === "DELETE_CONTACT" && " - Failed to delete contact."}
        </p>
      )}
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
