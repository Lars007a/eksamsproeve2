import styles from "./teamsSec.module.css";
import TeamsCard from "../teamsCard/teamsCard";
import { useSendGetRequest } from "../../hooks/useSendReq";
import ErrorBox from "../errorBox/errorBox";
import LoadingSpinner from "../spinner/spinner";

export default function teamsSec({}) {
  const res = useSendGetRequest("employees");

  return (
    <>
      {res.loading && <LoadingSpinner />}
      {res.error && <ErrorBox errorMsg={res.error} />}
      <section className={`${styles.teams} container`}>
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
