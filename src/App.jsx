import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CitiesProvider } from "./context/CitiesContext";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityItems from "./components/SidebarCitiesList";
import SidebarCountriesList from "./components/SidebarCountriesList";
import SidebarCity from "./components/SidebarCity";
import Form from "./components/Form";
import Loader from "./components/Loader";

//Implementing lazy loading for pages to optimize the application
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import Homepage from "./pages/Homepage";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";
// import Login from "./pages/Login";

const Homepage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

export default function App() {
    return (
        <AuthProvider>
            <CitiesProvider>
                <BrowserRouter>
                    <Suspense fallback={<Loader />}>
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
                    </Suspense>
                </BrowserRouter>
            </CitiesProvider>
        </AuthProvider>
    );
}
