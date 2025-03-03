import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Layout } from "./pages/Layout.jsx";
import SearchRestaurants from "./components/SearchRestaurants.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />, // El componente Layout envuelve todas las rutas hijas
        children: [
            { path: "/", element: <Home /> }, // Ruta principal
            { path: "/signup", element: <Signup /> },
            { path: "/login", element: <Login /> },
            { path: "/demo", element: <Demo /> }, // Ruta /demo
            { path: "/search-restaurants", element: <SearchRestaurants /> }, // Ruta /search-restaurants
            { path: "/single/:theId", element: <Single /> }, // Ruta dinámica /single/:theId
        ],
    },
]);
