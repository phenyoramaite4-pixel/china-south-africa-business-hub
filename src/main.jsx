import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";

import { LanguageProvider } from "./context/LanguageContext";
import { RegistrationProvider } from "./context/RegistrationContext";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <RegistrationProvider>
          <App />
        </RegistrationProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>
);