/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    isAuthenticated: false,
};

function reducer(state, action) {
    switch (action.type) {
        case "login": {
            return { ...state, user: action.payload, isAuthenticated: true };
        }
        case "logout": {
            return { ...state, user: null, isAuthenticated: false };
        }
        default: {
            throw new Error("Action Unknown");
        }
    }
}

const FAKE_USER = {
    name: "kevin",
    email: "njogutheanalyst@gmail.com",
    password: "gwerty",
};

function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const { user, isAuthenticated } = state;

    function loginUser(email, password) {
        if (email === FAKE_USER.email && password === FAKE_USER.password)
            dispatch({ type: "login", payload: FAKE_USER });
    }

    function logoutUser() {
        dispatch({ type: "logout" });
    }

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, loginUser, logoutUser }}
        >
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined)
        throw new Error(
            "Cities context was accessed outside the citites provider"
        );
    return context;
}

export { AuthProvider, useAuth };
