import styles from "./errorBox.module.css";

export default function ErrorBox({ errorMsg, margin = true }) {
  return (
    <div className={`${styles.box} container ${margin && styles.margin}`}>
      <p>{errorMsg}</p>
    </div>
  );
}
