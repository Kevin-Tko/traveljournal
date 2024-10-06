import { useEffect, useState } from "react";
import Button from "../components/Button";
import Navigation from "../components/Navigation";
import styles from "./Login.module.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { loginUser, isAuthenticated } = useAuth();
    const [userName, setUserName] = useState("njogutheanalyst@gmail.com");
    const [password, setPassword] = useState("gwerty");
    const navigate = useNavigate();

    useEffect(
        function () {
            if (isAuthenticated) navigate("/app", { replace: true });
        },
        [isAuthenticated, navigate]
    );

    function handleSubmit(e) {
        e.preventDefault();
        if (userName && password) {
            loginUser(userName, password);
        }
    }

    return (
        <>
            <Navigation />
            <main className={styles.login}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formEl}>
                        <label>Email Address</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </div>
                    <div className={styles.formEl}>
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {/* <button className={styles.btn}>Login</button> */}
                    <Button type="primary">Login</Button>
                </form>
            </main>
        </>
    );
}

export default Login;
