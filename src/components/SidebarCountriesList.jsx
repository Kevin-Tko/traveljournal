/* eslint-disable react/prop-types */
import { useCities } from "../context/CitiesContext";
import Loader from "./Loader";
import styles from "./Sidebar.module.css";
function SidebarCountriesList() {
    const { cities, isLoading, error } = useCities();

    if (isLoading) return <Loader />;
    if (!cities.length)
        return <p>👋Hello. Add your first country by clicking on the map.</p>;
    if (error) return <p>{error}</p>;

    //Creating a list of unique countries
    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, []);

    return (
        <ul className={styles.countryListEl}>
            {countries.map((country) => (
                <CityItem
                    key={country.country}
                    countryCode={country.emoji}
                    country={country.country}
                />
            ))}
        </ul>
    );
}

// eslint-disable-next-line react/prop-types
function CityItem({ countryCode, country }) {
    return (
        <li className={styles.countryEl}>
            <p className={styles.countryCode}>{countryCode}</p>
            <p>{country}</p>
        </li>
    );
}

export default SidebarCountriesList;
