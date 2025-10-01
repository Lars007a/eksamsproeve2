import { useParams, useSearchParams } from "react-router-dom";
import Header from "../comps/header/header";
import Introsec from "../comps/introsec/introsec";
import TeamsSec from "../comps/teamsSec/teamsSec";
import { useEffect, useState } from "react";
import { useSendGetRequest } from "../hooks/useSendReq";
import MsgBox from "../comps/msgBox/msgBox.jsx";
import LoadingSpinner from "../comps/spinner/spinner.jsx";
import useCheckId from "../hooks/useCheckId.jsx";
import DetailsPage from "../comps/detailsPage/detailsPage.jsx";

export default function DishPage({}) {

  const {id} = useParams();
  const getReq = useSendGetRequest(`dish/${id}`);

useEffect(() => {
    getReq.get(`dish/${id}`)
}, [id]);


  return (
    <>
      <Header textOne={"Den"} textTwo={"Glade"} textThree={getReq?.data?.title || "Skorbe"} />
      {getReq.loading && <LoadingSpinner margin={true}/>}
      {getReq.error != null ? <MsgBox msg={getReq.error} margin={true} success={false}/> : ""}
      {getReq?.data &&
      <DetailsPage img={getReq.data.image} title={getReq.data.title} ingredientsArray={getReq.data.ingredients} priceObj={getReq.data.price} />
      }
    </>
  );
}
