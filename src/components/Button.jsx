import styles from "./Button.module.css";

// eslint-disable-next-line react/prop-types
function Button({ children, onclick, type }) {
    return (
        <button className={`${styles[type]} ${styles.btn}`} onClick={onclick}>
            {children}
        </button>
    );
}

export default Button;
