import { useEffect } from "react";
import styles from "./msgBox.module.css";

export default function MsgBox({ msg, margin = true, success=false, setter }) {

  //Brugere margin og success props til at style.
  //Bruger msg props til beskeden.

  //Setter proppen skal være en setter på den State variable, der viser boxen, og den bliver brugt til
  //at fjerne boksen efter 1.5sek.

  useEffect(() => {
    if(setter == undefined || setter == null) return;
    setTimeout(() => setter(null), 2000);
  }, [setter])

  return (
    <div className={`${styles.box} container ${margin && styles.margin} ${success && styles.success}`}>
      <p>{msg}</p>
    </div>
  );
}
