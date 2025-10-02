import styles from "./ChooseSize.module.css";
import Introsec from "../introsec/introsec";
import { useEffect, useRef, useState } from "react";


export default function ChooseSize({priceObj={} /* dish produkt type og pris objekt. */,
     addFunc, //Funktion til at tilføje til kurv.
    selectedPrice //State for pris der bliver vist i bunden af siden, baseret på type, familie, normal, og lign.
    }) {

    const priceSelectElement = useRef(null); //Ref til pris selector dom elementet, hvor man vælger hvilket type af produktet, og dermed pris, man ville have.
    
    const handlePriceSelector = (event) => { //Når man ændre på hvilken type man ville have, familie, normal, etc, etc.
        selectedPrice.set(priceObj[event.target.value]); //Går ind i dish/porudkt objektet, og tager dens price objekt, og tager så dens key der dynamisk matcher den key, som der blev valgt i dropdownen.
    }

    useEffect(() => {
        selectedPrice.set(priceObj[priceSelectElement.current.value]);
        //Går ind i dish/porudkt objektet, og tager dens price objekt, og tager så dens key der dynamisk matcher den key, som der blev valgt i dropdownen.
    }, []);


    return <section className={`${styles.orderSec} container`}>
        <Introsec title={"Vælg størrelse"}/>
        <div className={styles.priceSec}>
            <select ref={priceSelectElement} onChange={handlePriceSelector}>
             {Object.keys(priceObj).map((element, index) => {
                 return <option value={element} key={index}>{element}</option>
             })}
         </select>

             <h2 className="textShadow">Pris:</h2>
             <h2 className="textShadow">{selectedPrice.get} kr</h2>
            <button onClick={addFunc} className="titleFont">Tilføj til kurven</button>
        </div>
    </section>
}