import styles from "./msgBox.module.css";

export default function MsgBox({ msg, margin = true, success=false }) {
  return (
    <div className={`${styles.box} container ${margin && styles.margin} ${success && styles.success}`}>
      <p>{msg}</p>
    </div>
  );
}
