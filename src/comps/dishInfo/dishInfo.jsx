import styles from "./DishInfo.module.css";
import { useSendGetRequest } from "../../hooks/useSendReq";
import Introsec from "../introsec/introsec";
import { useEffect, useRef, useState } from "react";

export default function DishInfo({img, title, productIngredients=[] /* ingredienser i produktet */, chosenExtra /* state for hvad ekstra ingredienser bliver valgt. */}) {

    const extraIngredients = useSendGetRequest("ingredients"); //Hook der fetcher alle ekstra ingredienser til ekstra ingredienser select elementet.
    const extraIngredientsSelector = useRef(null);




    useEffect(() => {
        chosenExtra.set(extraIngredientsSelector.current.value); //Sæt state til default value i selectoren.
    }, [])

    const changeHandler = (event) => {
        chosenExtra.set(event.target.value); //Set state når selectoren ændre sig.
    }

    return  <section className={styles.detailsPage}>
            <div className={styles.imgBox}>
                <img src={img} alt={title} />
            </div>
            <div className={styles.infoBox}>
                <h1 className="textShadow">{title}</h1>
    
                <div className={styles.ing}>
                    {productIngredients.map((element, index) => {
                        return <p key={index}>{element}</p>
                    })}
    
                    <select defaultValue={"none"} name="selectIng" id="selectIng" ref={extraIngredientsSelector} onChange={changeHandler}>
                        <option value="none" /* selected disabled */>Tilføj ingrediens...</option>
                        {extraIngredients.data && extraIngredients.data.map((element, index) => {
                            return <option value={element.name} key={element._id}>{element.name}</option>
                        })}
                    </select>
                </div>
            </div>
        </section>
}