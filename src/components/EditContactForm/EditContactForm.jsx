import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contactsSlice";
import axios from "axios";

const EditContactForm = ({ contact, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(contact.name);
  const [number, setNumber] = useState(contact.number);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = { name, number };

    try {
      const response = await axios.patch(
        `/api/contacts/${contact.id}`,
        contactData
      );
      console.log("Contact updated:", response.data);
      onClose();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={number}
        onChange={(e) => setNumber(e.target.value)}
        placeholder="Phone Number"
        required
      />
      <button type="submit">Update Contact</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default EditContactForm;
