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