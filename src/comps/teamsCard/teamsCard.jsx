import styles from "./teamsCard.module.css";

export default function TeamsCard({ img, name, title }) {
  return (
    <article className={styles.card}>
      <img src={img} alt={`${name} ${title}`} />
      <div className={styles.info}>
        <p>{name}</p>
        <p>{title}</p>
      </div>
    </article>
  );
}
