import { useLocalStorage } from "@uidotdev/usehooks"
import { useState } from "react";

export default function useCart() {

    const [cart, setCart] = useLocalStorage("cart", []); //Localstorage, hvor kurven er gemt, default er en empty array.
    const [error, setError] = useState(null); //Hvis der sker en fejl.

    //Funktioner til at ændre kurven.

    function addToCart(item) { //
        let newArray = [...cart]; //Lav en kopi af kurven.

        const alreadyAdded = newArray.findIndex((e) => JSON.stringify(e.item) == JSON.stringify(item)); //ser om objekterne er det samme, og dermed den samme item, der bliver tilføjet, compare objekterne med at lave dem til en JSON string.

        if(alreadyAdded == -1) { //Hvis ikke noget index blev fundet, altså hvis ikke noget objekt er det samme, som det vi prøvede at tilføje.
            newArray.push({ammount: 1, item: item}); //Tilføj elementet til kurven.
            setCart(newArray);
            return true;
        } 

        //Hvis et element blev fundet, så er produktet allerede i kurven.
        //Derfor opper vi ammount.
        newArray[alreadyAdded].ammount++;
        setCart(newArray);
        return true;
    }

    function removeFromCart(cartItem) { //Tager et helt objektet fra cartArrayen.

        let newArray = [...cart]; //Laver en copy af kurven.

        const index = newArray.findIndex((e) => JSON.stringify(e) == JSON.stringify(cartItem));

        if(index == -1) {
            //vi fandt ikke noget id.
            return false;
        }

        newArray.splice(index, 1);

        setCart(newArray);
        return true;

    }

    function clearCart() { //Bare sæt kurven til en empty array.
        setCart([]);
    }

    function getCart() { //Bare returnere kurv arrayen.
        return cart;
    }




    return {addToCart, removeFromCart, clearCart, getCart, cart}
}