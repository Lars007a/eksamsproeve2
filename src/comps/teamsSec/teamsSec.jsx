import styles from "./teamsSec.module.css";
import TeamsCard from "../teamsCard/teamsCard";
import { useSendGetRequest } from "../../hooks/useSendReq";
import MsgBox from "../msgBox/msgBox";
import LoadingSpinner from "../spinner/spinner";

export default function teamsSec({}) {
  const res = useSendGetRequest("employees");

  return (
    <>
      <section className={`${styles.teams} container`}>
      {res.loading && <LoadingSpinner />}
      {res.error && <MsgBox msg={res.error} />}
        <div className={styles.grid}>
          {res?.data &&
            res.data.map((element, index) => {
              return (
                <TeamsCard
                  name={element.name}
                  title={element.position}
                  key={element._id}
                  img={element.image}
                />
              );
            })}
        </div>
      </section>
    </>
  );
}
