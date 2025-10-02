import styles from "./CartDisplay.module.css";
import CartCard from "../CardCard/CartCard.jsx";
import useCart from "../../hooks/useCart.jsx";
import { useEffect, useRef, useState } from "react";
import MsgBox from "../msgBox/msgBox.jsx";
import { useSendDataRequest } from "../../hooks/useSendReq.jsx";

export default function CartDisplay({}) {

    const cart = useCart();
    
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [totalPrice, setTotalPrice] = useState(0);
    
    const sender = useSendDataRequest();
    
    const textareaRef = useRef(null);

    const send = () => {
        setError(null);
        setSuccess(null);

        if(cart.cart.length == 0) {
            setError("Skal være noget i kurven!");
            return;
        }

        let dishArray = [];

        for(let i = 0; i < cart.cart.length; i++) {
            let newObj = {};
            newObj.dish = cart.cart[i].item._id;
            newObj.ammount = cart.cart[i].ammount;
            newObj.size = cart.cart[i].type;
            newObj.extraIngredients = [cart.cart[i].chosenExtra];
            dishArray.push(newObj);
        }


        sender.sendJson("order", "POST", JSON.stringify({
            dishes: dishArray,
            comment: textareaRef.current.value,
            totalPrice: totalPrice,
        })).then((val) => {
            if(val.status != "ok") {
                throw new Error(val.message);
            }

            setSuccess(val.message);
            return;
            
        }).catch((error) => {
            setError(error.message);
        })
    }


    useEffect(() => {
        //når cart.cart arrayen opdater fra cart custom hook, så gen-kalkulere den samlede pris.
        let tempTotal = 0;
        for(let i = 0; i < cart.cart.length; i++) {
            const toAdd = Number(cart.cart[i].ammount) * Number(cart.cart[i].item.price);
            tempTotal = tempTotal + toAdd;
        }
        setTotalPrice(tempTotal);
    }, [cart.cart])
    


    return <section className={styles.CartDisplay}>
       {cart.cart.length > 0 ?  <div className={`container ${styles.content}`}>
            <div className={styles.grid}>

            {cart.cart.map((element, index) => {
                return <CartCard cartObj={element} key={index} errorSetter={setError}/>
            })}
            </div>


            <div className={styles.sendOrder}>
                <div className={styles.price}>
                    <span>I alt:</span><span>{totalPrice},-</span>
                </div>
                <textarea ref={textareaRef} name="msg" placeholder="Kommentar til ordren..."></textarea>
                <button onClick={send} className="titleFont">Afgiv ordre</button>
                {error &&
                <MsgBox msg={error} margin={true} success={false}/>
                }
                {success && 
                <MsgBox msg={success} margin={true} success={true}/>
                }
            </div>
        </div> : <p className={`${styles.empty} textShadow`}>Kurven er tom.</p>}
    </section>
}