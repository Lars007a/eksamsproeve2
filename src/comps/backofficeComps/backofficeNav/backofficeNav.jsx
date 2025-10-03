import { NavLink } from "react-router-dom";
import styles from "./backofficeNav.module.css";
import Employees from "../BackofficeEmployees/Employees.jsx";

export default function backofficeNav({setter}) {
    return <nav className={styles.backofficeNav}>
        <ul>
            <li onClick={() => {
                setter(<Employees/>) /* sætter state variablen der bliver vist på backoffice siden til at være employee backoffice siden/component. */
            }}>Employees</li>
        </ul>
    </nav>
}