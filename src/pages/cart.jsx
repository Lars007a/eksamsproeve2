import Introsec from "../comps/introsec/introsec";
import Header from "../comps/header/header.jsx";
import CartDisplay from "../comps/CartDisplay/CartDisplay.jsx";

export default function Cart({}) {
  return <>
  <Header textOne={"Den"} textTwo={"Glade"} textThree={"Skorbe"} />
  <Introsec
  title={"Bestilling"}
  />
  <CartDisplay/>

  
  </>;
}
