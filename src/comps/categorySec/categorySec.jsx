import styles from "./categorySec.module.css";
import {useSendGetRequest} from "../../hooks/useSendReq.jsx";
import { useEffect } from "react";
import ProductImage from "../productImage/productImage.jsx";


export default function CategorySec({}) {



    const getCats = useSendGetRequest("categories");


    useEffect(() => {
        console.log(getCats);
        console.log(getCats.data);
    }, [getCats.data])




    return <section className={styles.CategorySec}>
        <div className={styles.categories}>
            <div className={`container ${styles.catContent}`}>
                {getCats?.data && getCats.data.map((element, index) => {
                    return <ProductImage key={element._id} img={element.image} title={element.name}/>
                })}
            </div>
        </div>
        <div className={styles.catElements}>
            <div className={`container ${styles.elementContent}`}></div>
        </div>
    </section>
}