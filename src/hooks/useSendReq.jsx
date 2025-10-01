import { useEffect, useState } from "react";

export function useSendGetRequest(endpoint) {
    
    const apiUrl = "http://127.0.0.1:3042"; //api url, så at det bare kan ændres herfra.

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    function get(endpoint) {
      fetch(`${apiUrl}/${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((val) => {
            if(!val.ok) {
                throw new Error("Skete en fejl. Prøv igen...");
            }
            return val.json();
        }).then((val) => {
            setData(val.data);
        }).catch((error) => {
            setError(error.message);
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        get(endpoint);
    }, [])


    return {data, error, loading, get}
}


export function useSendDataRequest() {

    const apiUrl = "http://127.0.0.1:3042"


    function sendJson(endpoint, method, body, json = true) {
        const promise = fetch(`${apiUrl}/${endpoint}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
        },
        body: body
    }).then((val) => {
      
        return val.json();
    }).then((val) => {
        return val; //giv json data fra api'en tilbage til den næste i .then chainen på promiset, som denne funktion retunere.
    }).catch((error) => {
        throw error; //Giv fejlen videre til den næste i chainen, siden promiset blivere retuneret.
    });
    return promise;
    }


    function sendForm() {

    }

    return {sendJson, sendForm}
}