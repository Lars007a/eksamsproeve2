import styles from "./footer.module.css";
import {Link} from "react-router-dom";
import logo from "../../assets/logo.png";

export default function Footer({}) {
    return <footer className={styles.footer}>
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