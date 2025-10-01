import styles from "./categorySec.module.css";
import { useSendGetRequest } from "../../hooks/useSendReq.jsx";
import { useEffect, useState } from "react";
import ProductImage from "../productImage/productImage.jsx";
import LoadingSpinner from "../spinner/spinner.jsx";
import MsgBox from "../msgBox/msgBox.jsx";
import { useNavigate } from "react-router-dom";

export default function CategorySec({}) {
  const cats = useSendGetRequest("categories");
  const dishes = useSendGetRequest("dishes");
  const [arrayToShow, setArrayToShow] = useState([]); //Arrayen der skal vises.
  const nav = useNavigate();

  useEffect(() => {
    if (dishes.data == null) return;
    setArrayToShow(dishes.data); //Vis den fulde array til at starte med.
  }, [dishes.data]);

  return (
    <>
      {dishes.loading && cats.loading ? (
        <LoadingSpinner margin={true} />
      ) : dishes.error && cats.error ? (
        <MsgBox margin={true} msg={dishes.error || cats.error} />
      ) : (
        <>
          <section className={styles.categories}>
            <div className={`container ${styles.catContent}`}>
              {cats?.data &&
                cats.data.map((element, index) => { /*  */
                  return (
                    <ProductImage
                      key={element._id}
                      img={element.image}
                      title={element.name}
                      link={() => {
                        setArrayToShow(dishes.data.filter((e) => { /* når klikker, kør denne funktion,
                          der ændre på arrayen state variablen, der bliver vist, og filtrere den, der retunere en ny array,
                          som er filtreret, hvor alle hvor categorien fra elementet der blev klikket passer med kategorien gemt i elementeterne i den fulde dish array. */
                          if(e.category == element.name) return true;
                          return false;
                        }))
                      }}
                    />
                  );
                })}
            </div>
          </section>
          <section className={styles.catElements}>
            <div className={`container ${styles.elementContent}`}>
                
                {arrayToShow && arrayToShow.map((element, index) => {
                  return (
                          <ProductImage
                            img={element.image}
                            link={() => {
                              nav(`/dish/${element._id}`)
                            }}
                            title={element.title}
                            key={element._id}
                          />
                        )})}
            </div>
          </section>
        </>
      )}
    </>
  );
}
