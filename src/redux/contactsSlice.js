import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api/contacts";
import axios from "axios";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.fetchContacts();

      return response;
    } catch (error) {
      return rejectWithValue({
        type: "FETCH_CONTACTS",
        message: error.response?.data || error.message,
      });
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, { rejectWithValue }) => {
    try {
      const response = await api.addContact(contact);
      return response;
    } catch (error) {
      return rejectWithValue({
        type: "ADD_CONTACT",
        message: error.response?.data || error.message,
      });
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue({
        type: "DELETE_CONTACT",
        message: error.response?.data || error.message,
      });
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch contacts
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add contact
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete contact
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter(
          (contact) => contact.id !== action.payload
        );
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateContact.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (contact) => contact.id === action.payload.id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updatedContact }, { rejectWithValue }) => {
    try {
      const response = await api.updateContact(id, updatedContact);
      return response;
    } catch (error) {
      return rejectWithValue({
        type: "UPDATE_CONTACT",
        message: error.response?.data || error.message,
      });
    }
  }
);

export default contactsSlice.reducer;
