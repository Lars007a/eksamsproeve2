import styles from "./header.module.css";
import bgImg from "../../assets/headerImg.png";

export default function Header({ textOne, textTwo, textThree }) {
  return (
    <header className={styles.header}>
      <div
        className={styles.img}
        style={{ backgroundImage: `url(${bgImg})` }}
      ></div>
      <div className={styles.text}>
        <h3>{textOne}</h3>
        <h1>{textTwo}</h1>
        <h2>{textThree}</h2>
      </div>
    </header>
  );
}
