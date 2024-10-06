import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navigation.module.css";
import Logo from "./Logo";
import Button from "./Button";

function Navigation() {
    const navigate = useNavigate();
    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Products</NavLink>
                </li>
                <li>
                    <Button onclick={() => navigate("/login")} type="primary">
                        Login
                    </Button>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;

//using NavLink provides a class 'active' to the currently selected navigation link allowing easier styling
