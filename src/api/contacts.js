import axios from "axios";

const API_URL = "https://6702aac8bd7c8c1ccd3f8435.mockapi.io/contacts";

export const fetchContacts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addContact = async (contact) => {
  const response = await axios.post(API_URL, contact);
  return response.data;
};

export const deleteContact = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
