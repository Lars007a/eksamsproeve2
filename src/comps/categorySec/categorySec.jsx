import styles from "./categorySec.module.css";
import {useSendGetRequest} from "../../hooks/useSendReq.jsx";
import { useEffect, useState } from "react";
import ProductImage from "../productImage/productImage.jsx";


export default function CategorySec({}) {



    const cats = useSendGetRequest("categories");
    const dishes = useSendGetRequest("dishes");
    const [objToShow, setObjToShow] = useState(null);


    useEffect(() => {
        if(dishes.data == null) return;

        const newObj = {}; //Nyt object til at holde på en key med hver kategori, med en value til hver key som er en
        // array med alle objekterne for hvert dish/produkt.


         for(let i = 0; i < dishes.data.length; i++) { //Loop over alle dishes.
            const category = dishes.data[i].category; //Se kategorien og gem den i en variabel.

            if(!newObj[category]) { //Se om vi har keyen på objektet.
                newObj[category] = []; //Hvis vi ikke har, lav den og initialize den til en tom array.
            }

            newObj[category].push(dishes.data[i]); //Og put vores produkt/dish object i arrayen value, ligemeget om den eksisterede før eller ej.
        }
 
        setObjToShow(newObj);
        console.log(newObj);


    }, [dishes.data, cats.data])




    return <>
        <section className={styles.categories}>
            <div className={`container ${styles.catContent}`}>
                {cats?.data && cats.data.map((element, index) => {
                    return <ProductImage key={element._id} img={element.image} title={element.name}/>
                })}
            </div>
        </section>
        <section className={styles.catElements}>
            <div className={`container ${styles.elementContent}`}>
               {objToShow &&
                Object.keys(objToShow).map((key, keyIndex) => {
                    return <div key={keyIndex}>
                        {objToShow[key].map((element) => {
                            return <ProductImage img={element.image} link={""} title={element.title} key={element._id}/>
                        })}
                    </div>
                })
               }
            </div>
        </section>
    </>
}