import Header from "../comps/header/header";
import Introsec from "../comps/introsec/introsec";
import CategorySec from "../comps/categorySec/categorySec";

export default function Frontpage({}) {
  return (
    <>
      <Header textOne={"Den"} textTwo={"Glade"} textThree={"Skorbe"} />
      <Introsec
        text={`Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi bruger kun de bedste råvarer til både klassiske favoritter og spændende specialiteter som "Parma Drama" og "Rabbit Royale". Uanset om du er til en lille, personlig pizza eller en stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!`}
        title={"Velkommen til Den Glade Skorpe!"}
      />
      <Introsec title={"Kategorier"} />
      <CategorySec />
    </>
  );
}
