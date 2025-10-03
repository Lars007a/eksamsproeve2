import { NavLink } from "react-router-dom";
import styles from "./backofficeNav.module.css";
import Employees from "../BackofficeEmployees/Employees.jsx";

export default function backofficeNav({setter}) {
    return <nav className={styles.backofficeNav}>
        <ul>
            <li onClick={() => {
                setter(<Employees/>)
            }}>Employees</li>
        </ul>
    </nav>
}