import styles from "./ContactForm.module.css";

export default function ContactForm({}) {

    const submitFunc = (event) => {
        event.preventDefault();
    }

    return <section className={styles.form}>
        <div className={`${styles.content} container`}>
            <form onSubmit={submitFunc}>
                <label htmlFor="name" className="textShadow">Navn</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="subject" className="textShadow">Emne</label>
                <input type="text" id="subject" name="subject" />
                <label htmlFor="description" className="textShadow">Beskrivelse</label>
                <textarea type="text" id="description" name="description" />
                <input type="submit" className="titleFont" value={"Send"} />
            </form>
        </div>

    </section>
}