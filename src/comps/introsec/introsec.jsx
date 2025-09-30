import styles from "./introsec.module.css";

export default function Introsec({title, text}) {
    return <section className={styles.introSec}>

        <div className={`container ${styles.content}`}>

        <h1>{title}</h1>
        {text && <p>{text}</p>}
        </div>
    </section>
}