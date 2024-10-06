import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import styles from "./Homepage.module.css";
import Button from "../components/Button";

export default function Homepage() {
    return (
        <main className={styles.homepage}>
            <Navigation />
            <section>
                <h1>
                    You travel the world <br />
                    We help keep track of your adventures.
                </h1>
                <h2>
                    {" "}
                    A world map that tracks your footsteps into every city you
                    can think of. Never forget your wonderful experiences, and
                    show your friends how you have wandered the world.
                </h2>
                <Link to="/login">
                    <Button type="primary">Start tracking</Button>
                </Link>
            </section>
        </main>
    );
}
