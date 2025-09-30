import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/just-another-hand";
import "@fontsource/kurale";
import "./index.css";
import Navbar from "./comps/navbar/navbar.jsx";
import Header from "./comps/header/header.jsx";
import Footer from "./comps/footer/footer.jsx";
import Introsec from "./comps/introsec/introsec.jsx";
import CategorySec from "./comps/categorySec/categorySec.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Header textOne={"Den"} textTwo={"Glade"} textThree={"Skorbe"} />
      <Introsec text={`Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi bruger kun de bedste råvarer til både klassiske favoritter og spændende specialiteter som "Parma Drama" og "Rabbit Royale". Uanset om du er til en lille, personlig pizza eller en stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!`} title={"Velkommen til Den Glade Skorpe!"}/>
      <Introsec title={"Kategorier"}/>
      <CategorySec/>
      <Footer/>
    </BrowserRouter>
  </StrictMode>
);
