import React, { useState } from "react";
import axios from "axios";

const SearchRestaurants = () => {
    const [city, setCity] = useState("");
    const [datetime, setDatetime] = useState("");
    const [capacity, setCapacity] = useState(1);
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null); // Estado para el restaurante seleccionado

    const handleSearch = async () => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/restaurants", {
                params: {
                    city,
                    datetime,
                    capacity,
                },
            });
            setRestaurants(response.data);
        } catch (error) {
            console.error("Error fetching restaurants:", error);
        }
    };

    const handleSelectRestaurant = async (restaurantId) => {
        try {
            const response = await axios.get(import.meta.env.VITE_BACKEND_URL + `/api/restaurants/${restaurantId}`);
            setSelectedRestaurant(response.data); // Actualiza el estado con los detalles del restaurante
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
        }
    };

    return (
        <div className="search-restaurants">
            <h2>Buscar Restaurantes</h2>
            <div>
                <label>Ciudad:</label>
                <input
                    type="text"
                    placeholder="Ingresa la ciudad"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
            </div>
            <div>
                <label>Fecha y Hora:</label>
                <input
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                />
            </div>
            <div>
                <label>Capacidad de Mesa:</label>
                <input
                    type="number"
                    min="1"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                />
            </div>
            <button onClick={handleSearch}>Buscar</button>
            <h3>Resultados</h3>
            {restaurants.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Dirección</th>
                            <th>Tipo de Cocina</th>
                            <th>Disponibilidad</th>
                            <th>Seleccionar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((restaurant) => (
                            <tr key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.address}</td>
                                <td>{restaurant.cuisine}</td>
                                <td>{restaurant.availability}</td>
                                <td>
                                    <button onClick={() => handleSelectRestaurant(restaurant.id)}>
                                        Ver Detalles
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No hay restaurantes disponibles en esta ciudad</p>
            )}
            
            {selectedRestaurant && (
                <div>
                    <h3>Detalles del Restaurante Seleccionado:</h3>
                    <p><strong>Nombre:</strong> {selectedRestaurant.name}</p>
                    <p><strong>Dirección:</strong> {selectedRestaurant.address}</p>
                    <p><strong>Ciudad:</strong> {selectedRestaurant.city}</p>
                    <p><strong>Tipo de Cocina:</strong> {selectedRestaurant.cuisine}</p>
                    <p><strong>Disponibilidad:</strong> {selectedRestaurant.availability}</p>
                </div>
            )}
        </div>
    );
};

export default SearchRestaurants;
