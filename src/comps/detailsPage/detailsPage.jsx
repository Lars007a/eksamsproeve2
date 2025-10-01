import styles from "./detailsPage.module.css";
import { useSendGetRequest } from "../../hooks/useSendReq";
import Introsec from "../introsec/introsec";
import { useEffect, useRef, useState } from "react";


export default function detailsPage({img, title, ingredientsArray=[] /* ingredienser i produktet */, priceObj={} /* priser på forskellige typer af produktet */}) {


    const get = useSendGetRequest("ingredients"); //Hook der fetcher alle ekstra ingredienser til ekstra ingredienser select elementet.
    const [selectedPrice, setSelectedPrice] = useState(null); //Pris der bliver vist i bunden af siden.
    const priceSelectElement = useRef(null); //Ref til pris selector dom element.

    const handlePriceSelector = (event) => {
        setSelectedPrice(priceObj[event.target.value]);
    }

    useEffect(() => {
        setSelectedPrice(priceObj[priceSelectElement.current.value]);
    }, []);

    const add = (event) => {

    }

    return <>
    <section className={styles.detailsPage}>
        
        <div className={styles.imgBox}>
            <img src={img} alt={title} />
        </div>

        <div className={styles.infoBox}>
            <h1 className="textShadow">{title}</h1>

            <div className={styles.ing}>
                {ingredientsArray.map((element, index) => {
                    return <p key={index}>{element}</p>
                })}

                <select defaultValue={"none"} name="selectIng" id="selectIng">
                    <option value="none" /* selected disabled */>Tilføj ingrediens...</option>
                    {get.data && get.data.map((element, index) => {
                        return <option value={element.name} key={element._id}>{element.name}</option>
                    })}
                </select>
            </div>

        </div>

    </section>

    <section className={`${styles.orderSec} container`}>
        <Introsec title={"Vælg størrelse"}/>

        <div className={styles.priceSec}>
            <select ref={priceSelectElement} onChange={handlePriceSelector}>
             {Object.keys(priceObj).map((element, index) => {
                 return <option value={element} key={index}>{element}</option>
             })}
         </select>

             <h2 className="textShadow">Pris:</h2>
             <h2 className="textShadow">{selectedPrice}</h2>
        <button onClick={add} className="titleFont">Tilføj til kurven</button>
        </div>

    </section>
    </>
}