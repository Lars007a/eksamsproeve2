import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/just-another-hand";
import "@fontsource/kurale";
import "./index.css";
import Navbar from "./comps/navbar/navbar.jsx";
import Header from "./comps/header/header.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Header textOne={"Den"} textTwo={"Glade"} textThree={"Skorbe"} />
      <div style={{ height: "100vh" }}></div>
    </BrowserRouter>
  </StrictMode>
);
