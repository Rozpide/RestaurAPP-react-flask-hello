import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Estilos globales
import { RouterProvider } from "react-router-dom"; // Importa RouterProvider para manejar rutas
import { router } from "./routes"; // Importa el router configurado en routes.jsx
import { StoreProvider } from './hooks/useGlobalReducer'; // Proveedor del estado global
import { BackendURL } from './components/BackendURL'; // Componente para manejar errores de BackendURL

const Main = () => {
    if (!import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL === "") {
        return (
            <React.StrictMode>
                <BackendURL />
            </React.StrictMode>
        );
    }
    return (
        <React.StrictMode>
            <StoreProvider> 
                <RouterProvider router={router}>
                    {/* Configuración de rutas */}
                </RouterProvider>
            </StoreProvider>
        </React.StrictMode>
    );
};

// Renderiza el componente Main en el elemento raíz
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
