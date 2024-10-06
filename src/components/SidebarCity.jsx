/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Sidebar.module.css";
import Button from "./Button";
import { useCities } from "../context/CitiesContext";
import { useEffect } from "react";

export default function SidebarCity() {
    const { id } = useParams();
    const { getCity, currentCity } = useCities();
    const navigate = useNavigate();

    useEffect(
        function () {
            getCity(id);
        },
        [id]
    );

    if (!id) return;
    // const [city] = cities.filter((city) => city.id == id);
    const { cityName, date } = currentCity;
    // const dateselect = new Date(date);
    //.toISOString().split("T")[0];

    return (
        <div className={styles.city}>
            <div className={styles.cityData}>
                <h6>City Name</h6>
                <p>{cityName}</p>
            </div>
            <div className={styles.cityData}>
                <h6>You went to paris on</h6>
                <p>{date}</p>
            </div>
            <div className={styles.cityData}>
                <h6>Your Notes</h6>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque consequuntur id eaque enim ratione mollitia culpa
                    laborum natus suscipit placeat?
                </p>
            </div>
            <div className={styles.cityData}>
                <h6>Learn more</h6>
                <a href={`https://en.wikipedia.org/wiki/${cityName}`}>
                    Check out Paris on Wikipedia
                </a>
            </div>
            <div>
                <Button onclick={() => navigate(-1)} type="secondary">
                    &larr; Back
                </Button>
            </div>
        </div>
    );
}
