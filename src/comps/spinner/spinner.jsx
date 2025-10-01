import styles from "./spinner.module.css";

import { ClipLoader } from "react-spinners";

export default function loadingSpinner({ margin = true }) {
  return (
    <div className={`${styles.con} ${margin && styles.margin}`}>
      <ClipLoader size={40} loading={true} />
    </div>
  );
}
