import styles from "./Employees.module.css";
import {useSendGetRequest, useSendDataRequest} from "../../../hooks/useSendReq.jsx";
import { useEffect, useState } from "react";
import LoadingSpinner from "../../spinner/spinner.jsx";
import MsgBox from "../../msgBox/msgBox.jsx";
import Table from "../table/table.jsx";
import Introsec from "../../introsec/introsec.jsx";
import { MdClose } from "react-icons/md";
import useCheckId from "../../../hooks/useCheckId.jsx";

export default function Employees({}) {

    const get = useSendGetRequest("employees"); //Til at få data til tabellen. Arrayen bliver givet som prop til tabellen.
    const sender = useSendDataRequest(); //Object til at sende requests.

    const [showUpdate, setShowUpdate] = useState(null); //Om vi skal se update popup. Hvis vi skal, har den employee elementet.
    const [showDelete, setShowDelete] = useState(null); //Om vi skal se delete popup. Hvis vi skal, har den employee elementet.

    const [addError, setAddError] = useState(null); //Om der er fejl i tilføj employee form, hvis der er, har den en besked.
    const [deleteError, setDeleteError] = useState(null); //Hvis der er fejl ved at fjerne en employee, hvis der er, har den en besked.
    const [updateError, setUpdateError] = useState(null); //Om der er fejl i update form, hvis der er, har den en besked.
    const [updateSuccess, setUpdateSuccess] = useState(null); //Når vi successfuldt, opdater en employee, har den en besked.
    //De andre har ikke en success, fordi de lukker bare formen, og opdater tabellen.


    const idChecker = useCheckId(); //Til at validere om objectId.


    const deleteFunc = (id) => {
        setDeleteError(null);

        sender.sendJson(`employee/${id}`, "DELETE", null).then((val) => {
            
            if(val.status != "ok") {
                console.log(val)
                throw new Error(val.message);
            }

            setShowDelete(null); //Kun fjern popuppen på success.
            get.get("employees");
        }).catch((error) => {
            setDeleteError(error.message);
        })
        

    }

    const updateFunc = (event) => {
        event.preventDefault();
        setUpdateError(null);
        setUpdateSuccess(null);

        const fd = new FormData(event.target);

        //Ikke tjekke for fil, og se om billedet er uploadet.
        //Fordi hvis det ikke er, så genbruger api'en bager det gamle billed.
        //Hvis den er der, fint, hvis ikke, også fint.

        if(!fd.get("id") || !fd.get("name") || !fd.get("position")) {
            setUpdateError("Skal udfylde formen!");
            return;
        }

        if(!idChecker.validate(fd.get("id"))) { //Tjek om objectid.
            setUpdateError("Skal være et ordentligt id!");
            return;
        }

        //send opdate request, med formen, put request.
        sender.sendForm("employee", "PUT", fd).then((val) => {
            console.log(val);
            if(val.status != "ok") { //Check for fejl, hvis der er, send en fejl.
                throw new Error(val.message);
            }

            setUpdateSuccess(val.message); //hvis ikke fejl, success.
            get.get("employees"); //Opdater tabellen, opdatere state variablen der bliver vist i tabellen.

        }).catch((error) => {
            setUpdateError(error.message); //Vis en fejl, hvis fejl.
        })

    }

    const addEmployee = (event) => {
        event.preventDefault();
        setAddError(null); //Fjern eventuelle fejl.
        const fd = new FormData(event.target);

        const name = fd.get("name");
        const position = fd.get("position");
        const file = fd.get("file"); //Få formdata.

        if(!name || !position || file.size == 0) {
            setAddError("Skal fylde felterne ud!");
            return;
        } //Validere input.


        //Send en request, med formdata.
        sender.sendForm("employee", "POST", fd).then((val) => {
            console.log(val);
            if(val.status != "ok") { //Tjek for fejl.
                throw new Error(val.message);
            }
            console.log("success");
            get.get("employees"); //Hvis success, opdater tabellen.
        }).catch((error) => { //Hvis fejl, send fejlbesked..
            setAddError(error.message);
        })
        


    }

    return <section className={`${styles.employees} container`}>
        {get.loading && <LoadingSpinner margin={true}/>}
        {get.error && <MsgBox margin={true} success={false} msg={get.error}/>}
        {get.data && <>
        <Table deleteFunc={setShowDelete} updateFunc={setShowUpdate} ArrayToDisplay={get.data}/> {/* viser tabel, med state variabler til at vise popups. */}
        </>
        }

    <div className={`${styles.addSec}`}>
        <h1 className="normalFont">Tilføj employee</h1>
        <form onSubmit={addEmployee}>
            <input type="text" name="name" placeholder="Navn..." />
            <input type="text" name="position" placeholder="Position..." />
            <div>
            <label htmlFor="img">Billed:</label>
            <input type="file" name="file" id="img" />
            </div>
            <input type="submit" value={"Tilføj employee"} />
            {addError && <MsgBox margin={false} msg={addError} success={false} setter={setAddError}/>}
        </form>
    </div>


        {/* fixed position i forhold til hele sektionen.
        Hvis state variablen er sat med employee elementet, vis formen.
        */}
        {showUpdate != null ?  <div className={`${styles.updateSec}`}>
        <div className="container">
        <h1 className={`${styles.whiteText} normalFont`}>Update Employee</h1>
        <form onSubmit={updateFunc}>
            <input type="text" name="id" placeholder="Id..." defaultValue={showUpdate._id} />
            <input type="text" name="name" placeholder="Navn..." defaultValue={showUpdate.name} />
            <input type="text" name="position" placeholder="Position..." defaultValue={showUpdate.position} />
            <div>
            <label htmlFor="img" className={styles.whiteText}>Billed:</label>
            <input type="file" name="file" id="img" />
            </div>
            <input type="submit" value={"Tilføj employee"} />
            {updateError && <MsgBox margin={false} msg={updateError} success={false} setter={setUpdateError}/>}
            {updateSuccess && <MsgBox margin={false} msg={updateSuccess} success={true} setter={setUpdateSuccess}/>}
        </form>

        <MdClose onClick={() => {
            setShowUpdate(null);
        }}/>
        </div>
    </div> : ""}



    {
        /* Hvis state variablen er sat med employee elementet, vis formen.
        Som er en popup, deletepopup er fixed.
        */
        showDelete != null ? <div className={styles.deletePopup}>
            <div className="container">
                <article className={styles.dialog}>
                    <div className={styles.top}>
                        <p>Sletning af {showDelete._id}.</p>
                        <MdClose onClick={() => {
                            setShowDelete(null);
                        }}/>
                    </div>
                    <div className={styles.msg}>
                        <p>Er du sikker på, at du ville slette</p>
                        <strong>{showDelete.name}, {showDelete.position}</strong>
                        <strong>{showDelete._id}</strong>
                    </div>
                    <div className={styles.actions}>
                        <button className={styles.noBtn} onClick={() => {
                            setShowDelete(null);
                        }}>Nej</button>
                        <button className={styles.yesBtn} onClick={() => {
                            deleteFunc(showDelete._id);
                        }}>Ja</button>
                    </div>
                </article>
                {deleteError && <MsgBox margin={true} msg={deleteError} success={false} setter={setDeleteError}/>}
            </div>
        </div>
        : ""
    }


    



    </section>
}