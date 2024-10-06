import Sidebar from "../components/Sidebar";
import Map from "../components/Map";
import styles from "./AppLayout.module.css";

function AppLayout() {
    return (
        <main className={styles.appLayout}>
            <section>
                <Sidebar />
                <Map />
            </section>
        </main>
    );
}

export default AppLayout;
