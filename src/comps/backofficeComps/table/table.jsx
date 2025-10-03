import styles from "./table.module.css";
import { MdDelete } from "react-icons/md";
import { MdUpdate } from "react-icons/md";

export default function table({ArrayToDisplay = [], deleteFunc, updateFunc}) {
    //Arrayen er den der skal vises, en array med objects, updatefunc køres når update knappen klikkes,
    //samme med deletefunc.


    //Retunere en array med de keys, der er i det første object i arrayen,
    //så vi ved hvilke keys der skal vises i tabellen.
    const keysToDisplay = Object.keys(ArrayToDisplay[0]);




    return <div className={`${styles.tableCon}`}>


        <table> 
        <thead>
          <tr>
            {/* Loop over de keys der er i hvert object. Med fjern og update puttet på som ekstra ved alle sammen. */}
            {keysToDisplay.map((element, index) => {
              return <th key={index}>{element}</th>;
            })}
            <th>Fjern</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {ArrayToDisplay.map((element, index) => {
            /* loop over hele arrayen med alle objekterne, og laver en ny row i tabellen. */
            return (
              <tr key={element._id}>
                {/* for hver row i tabellen, loop over alle keys,
                 og for hver key retunere et felt med det nuværende objekt i arrayens key..
                */}
                {keysToDisplay.map((e, i) => {
                  return (
                    <td key={i}>
                        {e == "image" || e == "img" ? 
                        <img src={element[e]}/>    
                        : 
                        <div>{element[e]}</div>
                        }
                    </td>
                  );
                })}

                {/* tilføj så bare lige de ekstra felter. */}
                <td>
                  <MdDelete
                    onClick={() => {
                      deleteFunc(element);
                    }}
                  />
                </td>
                <td>
                  <MdUpdate
                    onClick={() => {
                      updateFunc(element);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>


    </div>
}