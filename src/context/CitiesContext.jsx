/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

//number 3 = Create initial state
const initialState = {
    cities: [],
    isLoading: true,
    error: "",
    currentCity: {},
};

//number 2 = Createreducer function reducer
function reducer(state, action) {
    switch (action.type) {
        case "allCitiesDataReceived": {
            return {
                ...state,
                cities: action.payload,
                isLoading: false,
            };
        }
        case "currentCityDataReceived": {
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
            };
        }
        case "createCity": {
            const allCities = state.cities;
            return {
                ...state,
                isLoading: false,
                cities: [...allCities, action.payload],
            };
        }
        case "deleteCity": {
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
            };
        }
        case "error": {
            return {
                ...state,
                isLoading: false,
                error: action.payload,
            };
        }
        default: {
            throw new Error("Action unknown");
        }
    }
}

//Step 1 = Create context
const CitiesContext = createContext();

function CitiesProvider({ children }) {
    //number 1 = initialize reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    //number 4 = Destructure current state
    const { cities, isLoading, error, currentCity } = state;

    useEffect(function () {
        //fetching cities from our fake API
        async function fetchCities() {
            try {
                const response = await fetch(`${BASE_URL}/cities`);
                const data = await response.json();

                //number 5 = Disapatch actions
                dispatch({ type: "allCitiesDataReceived", payload: data });
            } catch (err) {
                dispatch({
                    type: "error",
                    payload: err.message,
                });
            }
        }
        fetchCities();
    }, []);

    //Fetching current city
    async function getCity(id) {
        if (id == currentCity.id) return;
        try {
            const response = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await response.json();
            dispatch({ type: "currentCityDataReceived", payload: data });
        } catch {
            dispatch({
                type: "error",
                payload: "Error Fetching current city!!",
            });
        }
    }

    async function createCity(newCity) {
        try {
            const response = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();

            dispatch({ type: "createCity", payload: data });
        } catch {
            dispatch({
                type: "error",
                payload: "Error creating new city!!",
            });
        }
    }

    async function deleteCity(id) {
        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: "deleteCity", payload: id });
        } catch {
            dispatch({
                type: "error",
                payload: "Error creating new city!!",
            });
        }
    }

    return (
        //Step 2 = Provide context
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                error,
                currentCity,
                getCity,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

function useCities() {
    //Step 2 = Use context
    const context = useContext(CitiesContext);
    if (context === undefined)
        throw new Error(
            "Cities context was accessed outside the citites provider"
        );
    return context;
}

export { CitiesProvider, useCities };
