import Introsec from "../comps/introsec/introsec";
import ContactForm from "../comps/ContactForm/ContactForm.jsx";
import Header from "../comps/header/header.jsx";

export default function Contact({}) {
  return <>
  <Header textOne={"Den"} textTwo={"Glade"} textThree={"Skorbe"} />
  <Introsec text={"Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi glæder os til at høre fra dig!"}
  title={"Har du spørgsmål eller ønsker du at bestille din favoritpizza?"}
  />
  <ContactForm/>


  
  </>;
}
