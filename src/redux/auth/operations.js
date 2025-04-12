import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, thunkApi) => {
    try {
      const response = await axios.post("/users/signup", {
        name,
        email,
        password,
      });
      setAuthHeader(res.data.token);
      return response.data;
    } catch (err) {
      console.error(
        "Error during registration:",
        err.response ? err.response.data : err.message
      );
      return thunkApi.rejectWithValue(
        err.response ? err.response.data : err.message
      );
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, thunkApi) => {
    try {
      const response = await axios.post("/users/login", credentials);
      setAuthHeader(response.data.token);
      return response.data;
    } catch (err) {
      console.log(
        "Error logging in:",
        err.response ? err.response.data : err.message
      );
      return thunkApi.rejectWithValue(
        err.response ? err.response.data : err.message
      );
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkApi) => {
  const state = thunkApi.getState();
  const token = state.auth.token;

  if (!token) {
    return thunkApi.rejectWithValue("No token found");
  }

  setAuthHeader(token);
  try {
    await axios.post("/users/logout");
    clearAuthHeader();
  } catch (err) {
    console.error(
      "Error logging out:",
      err.response ? err.response.data : err.message
    );
    return thunkApi.rejectWithValue(
      err.response ? err.response.data : err.message
    );
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkAPI) => {
    const persistToken = thunkAPI.getState().auth.token;

    if (!persistToken) {
      return thunkAPI.rejectWithValue("No token available");
    }
    try {
      setAuthHeader(persistToken);
      const response = await axios.get("/users/current");
      return response.data;
    } catch (e) {
      if (e.response && e.response.status === 401) {
        clearAuthHeader();
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  }
);
