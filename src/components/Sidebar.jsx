import Logo from "./Logo";
import styles from "./Sidebar.module.css";
import Selector from "./SidebarSelector";
// import CityItems from "./SidebarCitiesList";
import { Outlet } from "react-router-dom";

export default function Sidebar() {
    return (
        <div className={styles.sidebarNav}>
            <Logo />
            <Selector />

            <Outlet />
        </div>
    );
}
