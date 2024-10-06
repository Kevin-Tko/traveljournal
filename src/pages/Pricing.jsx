import Navigation from "../components/Navigation";
import styles from "./pricing.module.css";

export default function Pricing() {
    return (
        <>
            <Navigation />

            <main className={styles.pricing}>
                <section>
                    <div>
                        <h2>
                            Affordable Prices. <br /> Just $9 a month.
                        </h2>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Itaque sit, ab incidunt pariatur quasi
                            blanditiis voluptates ipsa quo sint aliquam
                            molestiae adipisci eum culpa quam minus? Delectus
                            saepe repellendus placeat.
                        </p>
                    </div>
                    <img src="images/pricing.jpg" alt="london city" />
                </section>
            </main>
        </>
    );
}
