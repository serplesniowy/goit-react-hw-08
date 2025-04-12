import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { PersistGate } from "redux-persist/es/integration/react";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StrictMode>
          <Toaster />
          <App />
        </StrictMode>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
