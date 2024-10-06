import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

export default function Selector() {
    return (
        <div className={styles.selector}>
            <NavLink to="cities" className={styles.selectors}>
                Cities
            </NavLink>
            <NavLink to="countries" className={styles.selectors}>
                Countries
            </NavLink>
        </div>
    );
}
