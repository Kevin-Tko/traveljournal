import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlLocation } from "../hooks/useUrlLocation";
import Loader from "./Loader";
import { useCities } from "../context/CitiesContext";

// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
    const { createCity } = useCities();
    const [maplat, maplng] = useUrlLocation();
    const navigate = useNavigate();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    const [isLoadinGeocoding, setIsLoadingGeocoding] = useState(false);
    const [errorLoadingLocation, setErrorLoadingLocation] = useState("");

    //reverse Geocoding
    useEffect(
        function () {
            if (!maplat && !maplng) return;
            async function fetchCityName() {
                try {
                    setIsLoadingGeocoding(true);
                    setErrorLoadingLocation("");
                    const response = await fetch(
                        `${BASE_URL}?latitude=${maplat}&longitude=${maplng}`
                    );
                    const data = await response.json();

                    if (!data.countryCode)
                        throw new Error(
                            "No city selected! Please select a city😔"
                        );

                    setCityName(data.city || data.locality || "");
                    setCountry(data.countryName || "");
                    setCountryCode(data.countryCode || "");
                } catch (err) {
                    setErrorLoadingLocation(err.message);
                } finally {
                    setIsLoadingGeocoding(false);
                }
            }

            fetchCityName();
        },
        [maplat, maplng]
    );

    //handle submit fuction
    async function handleSubmit(e) {
        e.preventDefault();

        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji: countryCode,
            date,
            notes,
            position: { lat: maplat, lng: maplng },
        };

        //use async await to ensure navigation works well
        await createCity(newCity);
        navigate("/app/cities");
    }

    if (isLoadinGeocoding) return <Loader />;
    if (errorLoadingLocation) return <p>{errorLoadingLocation}</p>;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                {/* <span className={styles.flag}>{emoji}</span> */}
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <DatePicker
                    selected={date}
                    onChange={(date) => setDate(date)}
                    dateFormat="dd/MM/yyyy"
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <Button
                    onclick={(e) => {
                        //prevents this button from submitting the form
                        e.preventDefault();
                        navigate(-1);
                    }}
                    type="secondary"
                >
                    &larr; Back
                </Button>
            </div>
        </form>
    );
}

export default Form;
