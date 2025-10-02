import { useParams, useSearchParams } from "react-router-dom";
import Header from "../comps/header/header";
import Introsec from "../comps/introsec/introsec";
import TeamsSec from "../comps/teamsSec/teamsSec";
import { useEffect, useState } from "react";
import { useSendGetRequest } from "../hooks/useSendReq";
import MsgBox from "../comps/msgBox/msgBox.jsx";
import LoadingSpinner from "../comps/spinner/spinner.jsx";
import useCheckId from "../hooks/useCheckId.jsx";
import ChooseSize from "../comps/ChooseSize/ChooseSize.jsx";
import DishInfo from "../comps/dishInfo/dishInfo.jsx";
import useCart from "../hooks/useCart.jsx";

export default function DishPage({}) {

  const {id} = useParams();
  const dishProduct = useSendGetRequest(`dish/${id}`);
  const cart = useCart();

  const [msg, setMsg] = useState(null);

useEffect(() => {
    dishProduct.get(`dish/${id}`)
}, [id]);



  const [selectedPrice, setSelectedPrice] = useState(null); //Pris og produkt type valgt, normal eller familie og lign.
  const [chosenExtra, setChosenExtra] = useState(null); //Extra ingrediens valgt.
  //Når man klikker på tilføj til kurv.
    const addFunc = () => {
      setMsg(null);
      const type = Object.keys(dishProduct.data.price).find((e) => dishProduct.data.price[e] == selectedPrice);
      //Får en array af de keys i price objektet (familie, normal, etc,etc), looper over den, og ser om det key value pair i price objektet matcher den valgte pris, og hvis det gør, så gemmer vi den.

      const res = cart.addToCart({image: dishProduct.data.image, _id: dishProduct.data._id, title: dishProduct.data.title, ingredients: dishProduct.data.ingredients, category: dishProduct.data.category, price: selectedPrice, chosenExtra: chosenExtra, type: type})
      if(!res) return;
      setMsg("Tilføjede til kurven!");
      
    }


  return (
    <>
      <Header textOne={"Den"} textTwo={"Glade"} textThree={dishProduct?.data?.title || "Skorbe"} />
      {dishProduct.loading && <LoadingSpinner margin={true}/>}
      {dishProduct.error != null ? <MsgBox msg={getReq.error} margin={true} success={false}/> : ""}
      {dishProduct?.data && <>
      <DishInfo img={dishProduct?.data.image} title={dishProduct?.data.title} productIngredients={dishProduct.data.ingredients} chosenExtra={{set: setChosenExtra, get: chosenExtra}}/>
      <ChooseSize priceObj={dishProduct.data.price} addFunc={addFunc} selectedPrice={{set: setSelectedPrice, get: selectedPrice}} />
      {msg && <MsgBox margin={true} msg={msg} success={true}/>}


      </>
      }
    </>
  );
}
