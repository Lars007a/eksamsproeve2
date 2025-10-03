import styles from "./ContactForm.module.css";
import { useSendDataRequest } from "../../hooks/useSendReq";
import { useState } from "react";
import MsgBox from "../msgBox/msgBox";
import FullScreenSuccess from "../fullScreenSuccess/fullScreenSuccess.jsx";

export default function ContactForm({}) {



    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);


    const req = useSendDataRequest();


    const submitFunc = (event) => {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const form = event.target;

        const fd = new FormData(form);

        const name = fd.get("name");
        const subject = fd.get("subject");
        const description = fd.get("description");

        if(!description || !name || !subject) {
            setError("Skal udfylde felterne!");
            return;
        }


        req.sendJson("message", "POST", JSON.stringify({name: name, subject: subject, description: description}), false).then((val) => {
            if(val.status != "ok") {
                throw new Error(val.message);
            }
            console.log(val);
            setSuccess(name);
        }).catch((error) => {
            setError(error.message);
        })


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
                {error && <MsgBox margin={false} success={false} msg={error} setter={setError}/>}
                {success && <FullScreenSuccess close={() => {
                    setSuccess(null);
                }} firstMsg={`Tak for din besked ${success}`} secondMsg={"Vi vender tilbage hurtigst muligt!"}/>}
            </form>
        </div>

    </section>
}