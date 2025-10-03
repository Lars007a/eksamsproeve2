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

    const get = useSendGetRequest("employees");
    const sender = useSendDataRequest();

    const [showUpdate, setShowUpdate] = useState(null);
    const [showDelete, setShowDelete] = useState(null);

    const [addError, setAddError] = useState(null);
    const [deleteError, setDeleteError] = useState(null);
    const [updateError, setUpdateError] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);


    const idChecker = useCheckId();


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

        if(!idChecker.validate(fd.get("id"))) {
            setUpdateError("Skal være et ordentligt id!");
            return;
        }

        sender.sendForm("employee", "PUT", fd).then((val) => {
            console.log(val);
            if(val.status != "ok") {
                throw new Error(val.message);
            }

            setUpdateSuccess(val.message);
            get.get("employees");

        }).catch((error) => {
            setUpdateError(error.message);
        })

    }

    const addEmployee = (event) => {
        event.preventDefault();
        setAddError(null);
        const fd = new FormData(event.target);

        const name = fd.get("name");
        const position = fd.get("position");
        const file = fd.get("file");

        if(!name || !position || file.size == 0) {
            setAddError("Skal fylde felterne ud!");
            return;
        }

        sender.sendForm("employee", "POST", fd).then((val) => {
            console.log(val);
            if(val.status != "ok") {
                throw new Error(val.message);
            }
            console.log("success");
        }).catch((error) => {
            setAddError(error.message);
        })
        
        get.get("employees");


    }

    return <section className={`${styles.employees} container`}>
        {get.loading && <LoadingSpinner margin={true}/>}
        {get.error && <MsgBox margin={true} success={false} msg={get.error}/>}
        {get.data && <>
        <Table deleteFunc={setShowDelete} updateFunc={setShowUpdate} ArrayToDisplay={get.data}/>
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


        {/* fixed position i forhold til hele sektionen. */}
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