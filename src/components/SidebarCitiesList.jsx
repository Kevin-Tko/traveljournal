/* eslint-disable react/prop-types */
import styles from "./Sidebar.module.css";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { useCities } from "../context/CitiesContext";

// eslint-disable-next-line react/prop-types
export default function CityItems() {
    const { currentCity, deleteCity } = useCities();
    const { cities, isLoading, error } = useCities();

    function handleDelete(e, id) {
        e.preventDefault();
        deleteCity(id);
    }

    if (isLoading) return <Loader />;
    if (!cities.length)
        return <p>👋Hello. Add your first city by clicking on the map.</p>;
    if (error) return <p>{error}</p>;

    return (
        <ul className={styles.cityListEl}>
            {cities.map((city) => (
                <CityItem
                    key={city.id}
                    countryCode={city.emoji}
                    country={city.country}
                    city={city.cityName}
                    date={new Date(city.date).toISOString().split("T")[0]}
                    id={city.id}
                    position={city.position}
                    currentCity={currentCity}
                    ondelete={handleDelete}
                />
            ))}
        </ul>
    );
}

// eslint-disable-next-line react/prop-types
function CityItem({
    countryCode,
    city,
    date,
    id,
    position,
    currentCity,
    ondelete,
}) {
    return (
        <li>
            <Link
                className={`${styles.cityEl} ${
                    currentCity.id == id ? styles["cityEl--active"] : ""
                }`}
                to={`${id}?lat=${position.lat}&lng=${position.lng}`}
            >
                <p>{countryCode}</p>
                <p>{city}</p>
                <p>{date}</p>
                <button className={styles.btn} onClick={(e) => ondelete(e, id)}>
                    x
                </button>
            </Link>
        </li>
    );
}
