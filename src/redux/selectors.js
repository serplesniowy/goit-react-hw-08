import { createSelector } from "reselect";

const getContacts = (state) => state.contacts.items;
const getFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [getContacts, getFilter],
  (contacts, filter) => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
