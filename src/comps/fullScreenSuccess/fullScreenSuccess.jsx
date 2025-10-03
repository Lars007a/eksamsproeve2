import styles from "./fullScreenSuccess.module.css";
import bgImg from "../../assets/headerImg.png";
import { MdClose } from "react-icons/md";

export default function fullScreenSuccess({firstMsg, secondMsg, close}) {

    return <section className={styles.popup} style={{backgroundImage: `url(${bgImg})`}}>
        <div className={styles.content}>
            <p className="textShadow">{firstMsg}</p>
            {secondMsg && <p className="textShadow">{secondMsg}</p>}
        </div>
        <MdClose onClick={() => {
            close(null);
        }}/>
    </section>

}