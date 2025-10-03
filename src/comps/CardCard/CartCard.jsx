import useCart from "../../hooks/useCart";
import styles from "./CartCard.module.css";
import { IoMdClose } from "react-icons/io";



export default function CartCard({cartObj, errorSetter}) {


    const cart = useCart();

    const deleteItem = () => {
        errorSetter(null);
        const res = cart.removeFromCart(cartObj);
        if(!res) {
            errorSetter("Skete en fejl.");
            return;
        }

        //Skal ikke opdater state her, siden den cart der bliver loopet igennem
        //er useLocalStorage hooket's variabler, og den der bliver ændret af mit eget custom hook.
    }

    return <article className={styles.CartCard}>
        <div className={styles.top}>
            <p className="textShadow">{cartObj.ammount} X</p>
            <img src={cartObj.item.image} alt={cartObj.item.title} />
            <p className="textShadow">{cartObj.item.title}</p>

            <IoMdClose className={styles.removeBtn} onClick={deleteItem}/>

        </div>

        <div className={styles.info}>
            {cartObj.item.chosenExtra != "none" && 
                        <div>
                <p>Ekstra:</p>
                <p>{cartObj.item.chosenExtra}</p>
            </div>
            
            }
            <div>
                <p>Størrelse:</p>
                <p>{cartObj.item.type}</p>
            </div>
            <div>
                <p>Pris:</p>
                <p>{cartObj.item.price},-</p>
            </div>

        </div>
    </article>
}