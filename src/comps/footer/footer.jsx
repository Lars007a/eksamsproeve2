import styles from "./footer.module.css";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Footer({}) {

    const [show, setShow] = useState(true);
    const loc = useLocation(); /* så vi kan få url. */

    useEffect(() => {
        //Så at component ikke vises på backoffice.
        if(loc.pathname.includes("/backoffice")) {
            setShow(false);
        }else setShow(true);
    }, [loc, loc.pathname])


    return <>
    {show != true ? "" : 
    
    
    <footer className={styles.footer}>
        <div className={`${styles.content} container`}>

        <div className={styles.imgCon}>
            <div className={styles.logo} style={{backgroundImage: `url(${logo})`}}/>
        </div>
        <div className={styles.linkSec}>
            <ul>
                <li className="titleFont">Email: gladskorpe@pizzaglad.dk</li>
                <li className="titleFont">Tlf: +45 12 34 56 78</li>
                <li className="titleFont">Addresse: Skorpevej 42, 1234 Pizzabyen.</li>
            </ul>
        </div>
        </div>
    </footer>
    }
    </>
}