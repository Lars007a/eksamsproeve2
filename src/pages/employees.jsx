import Header from "../comps/header/header";
import Introsec from "../comps/introsec/introsec";
import TeamsSec from "../comps/teamsSec/teamsSec";

export default function Employees({}) {
  return (
    <>
      <Header textOne={"Den"} textTwo={"Glade"} textThree={"Skorbe"} />
      <Introsec
        title={"Personalet hos Den Glade Skorpe"}
        text={`Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der altid går den ekstra mil for at sikre, at kunderne får den bedste oplevelse. Teamet består af erfarne pizzabagere, der med passion tilbereder lækre pizzaer med friske råvarer.`}
      />
      <TeamsSec />
    </>
  );
}
