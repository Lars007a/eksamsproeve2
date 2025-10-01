import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/just-another-hand";
import "@fontsource/kurale";
import "./index.css";
import App from "./app";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
