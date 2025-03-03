import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [user, setUser] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/login", formData);
            const { access_token, user } = response.data;

            // Guardar el token en localStorage o en un contexto global
            localStorage.setItem("token", access_token);
            setUser(user);
            setMessage("Inicio de sesión exitoso");
        } catch (error) {
            setMessage(error.response?.data?.error || "Hubo un error al iniciar sesión");
        }
    };

    return (
        <div className="login-form">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Contraseña:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Entrar</button>
            </form>
            {message && <p>{message}</p>}
            {user && (
                <div>
                    <h3>Bienvenido, {user.name}!</h3>
                </div>
            )}
        </div>
    );
};

export default Login;
