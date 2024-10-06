import Navigation from "../components/Navigation";
import styles from "./Product.module.css";

export default function Product() {
    return (
        <>
            <Navigation />
            <main className={styles.product}>
                <section>
                    <img src="images/product.jpg" alt="man walking his dogs" />
                    <div>
                        <h2>About us</h2>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Itaque sit, ab incidunt pariatur quasi
                            blanditiis voluptates ipsa quo sint aliquam
                            molestiae adipisci eum culpa quam minus? Delectus
                            saepe repellendus placeat.
                        </p>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Itaque sit, ab incidunt pariatur quasi
                            blanditiis voluptates ipsa quo sint aliquam
                            molestiae adipisci eum culpa quam minus? Delectus
                            saepe repellendus placeat.
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}
