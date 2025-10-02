import styles from "./CartDisplay.module.css";
import CartCard from "../CardCard/CartCard.jsx";
import useCart from "../../hooks/useCart.jsx";
import { useEffect, useState } from "react";
import MsgBox from "../msgBox/msgBox.jsx";

export default function CartDisplay({}) {

    const cart = useCart();
    const [error, setError] = useState(null);

    const send = () => {
        setError(null);
    }
    


    return <section className={styles.CartDisplay}>
        <div className={`container ${styles.content}`}>
            <div className={styles.grid}>

            {cart.cart.map((element, index) => {
                return <CartCard cartObj={element} key={index} errorSetter={setError}/>
            })}
            </div>


            <div className={styles.sendOrder}>
                <div className={styles.price}>

                    <span>I alt:</span><span>Hej,-</span>
                </div>
                <textarea name="msg" placeholder="Kommentar til ordren..."></textarea>
                <button onClick={send} className="titleFont">Afgiv ordre</button>
                {error && <MsgBox msg={error} margin={true} success={false}/>}
            </div>
        </div>
    </section>
}