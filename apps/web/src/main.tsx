import React from "react";

import ReactDOM from "react-dom/client";
import ScrollToTop from "./components/ScrollToTop";

import App from "./App";

import "./index.css";

import {
  BrowserRouter,
} from "react-router-dom";

import {
  GoogleOAuthProvider,
} from "@react-oauth/google";

import { Toaster }
from "react-hot-toast";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(

  <React.StrictMode>

    <BrowserRouter>

    <ScrollToTop />

      <GoogleOAuthProvider
        clientId={
          import.meta.env
            .VITE_GOOGLE_CLIENT_ID
        }
      >
        <Toaster
      position="top-right"
    />

        <App />

      </GoogleOAuthProvider>

    </BrowserRouter>

  </React.StrictMode>
);