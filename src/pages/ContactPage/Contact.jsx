import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Fuse from "fuse.js";
import Modal from "react-modal";
import {
  deleteContact,
  fetchContacts,
  addContact,
} from "../../redux/contactsSlice";
import { selectFilteredContacts } from "../../redux/selectors";
import ContactItem from "../../components/ContactItem";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactList from "../../components/ContactList/ContactList";
import SearchBox from "../../components/SearchBox/SearchBox";
import "../../modalStyles.css";
import { toast } from "react-hot-toast";
import EditContactForm from "../../components/EditContactForm/EditContactForm";

Modal.setAppElement("#root");

export default function ContactPage() {
  const contacts = useSelector(selectFilteredContacts);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [contactToEdit, setContactToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    console.log("Attempting to delete contact with ID:", id);
    if (id) {
      dispatch(deleteContact(id));
      closeModal();
      toast.success("Contact deleted!");
    } else {
      toast.error("Contact not found!");
    }
  };

  const handleAddContact = (name, number) => {
    dispatch(addContact({ name, number }));
    toast.success("Contact add!");
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const fuse = new Fuse(contacts, {
    keys: ["name", "number"],
    threshold: 0.3,
  });

  const filteredContacts = searchTerm
    ? fuse.search(searchTerm).map(({ item }) => item)
    : contacts;

  const openModal = (contact) => {
    console.log("Opening modal for contact:", contact);
    if (contact) {
      setContactToDelete(contact);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setContactToDelete(null);
  };

  const openEditModal = (contact) => {
    setContactToEdit(contact);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setContactToEdit(null);
  };

  return (
    <div>
      <h2>Contact List</h2>
      <ContactForm onAddContact={handleAddContact} />
      <SearchBox value={searchTerm} onChange={handleSearchChange} />
      {filteredContacts.length > 0 ? (
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={openModal}
          onEditContact={openEditModal}
        />
      ) : (
        <p>No contacts found.</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
      >
        <h2>Confirm Deletion</h2>
        <p>Are you sure you want to delete {contactToDelete?.name}?</p>
        <button onClick={() => handleDelete(contactToDelete.id)}>Yes</button>
        <button onClick={closeModal}>No</button>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={closeEditModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
      >
        {contactToEdit && (
          <EditContactForm contact={contactToEdit} onClose={closeEditModal} />
        )}
      </Modal>
    </div>
  );
}
