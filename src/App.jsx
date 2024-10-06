import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import Login from "./pages/Login";
import CityItems from "./components/SidebarCitiesList";
import SidebarCountriesList from "./components/SidebarCountriesList";
import SidebarCity from "./components/SidebarCity";
import Form from "./components/Form";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Homepage />} />
                        <Route
                            path="app"
                            element={
                                <ProtectedRoute>
                                    <AppLayout />
                                </ProtectedRoute>
                            }
                        >
                            <Route
                                index
                                element={<Navigate replace to="cities" />}
                            />
                            <Route
                                path="cities/:id"
                                element={<SidebarCity />}
                            />
                            <Route path="cities" element={<CityItems />} />
                            <Route
                                path="countries"
                                element={<SidebarCountriesList />}
                            />
                            <Route path="form" element={<Form />} />
                        </Route>
                        <Route path="product" element={<Product />} />
                        <Route path="pricing" element={<Pricing />} />

                        <Route path="login" element={<Login />} />

                        <Route path="*" element={<PageNotFound />} />
                    </Routes>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}
