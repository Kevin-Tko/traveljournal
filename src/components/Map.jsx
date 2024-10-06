/* eslint-disable react/prop-types */
import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlLocation } from "../hooks/useUrlLocation";
import User from "./User";

export default function Map() {
    const { cities } = useCities();
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();

    const [mapPosition, setMapPosition] = useState([38.7223, -9.1393]);

    const [maplat, maplng] = useUrlLocation();

    useEffect(
        function () {
            if (maplat && maplng) setMapPosition([maplat, maplng]);
        },
        [maplat, maplng]
    );

    useEffect(
        function () {
            if (geolocationPosition)
                setMapPosition([
                    geolocationPosition.lat,
                    geolocationPosition.lng,
                ]);
        },
        [geolocationPosition]
    );

    return (
        <div className={styles.containerMap}>
            <User />

            {!geolocationPosition && (
                <Button type="position" onclick={getPosition}>
                    {isLoadingPosition ? "Loading..." : "User your position"}
                </Button>
            )}
            <MapContainer
                className={styles.map}
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
            >
                {" "}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        key={city.id}
                        position={[city.position.lat, city.position.lng]}
                    >
                        <Popup key={city.id}>
                            {city.cityName}
                            <br />
                            {city.emoji}
                        </Popup>
                    </Marker>
                ))}
                <ChangePosition position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

//own custom components

//Improves interaction by allowing the map to move around when the user clicks a differnt city in the cities list
function ChangePosition({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

//Opens the for on detecting a click on the map and stores the latitude and longitude states of the clicked position in the URL
function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
    return null;
}
