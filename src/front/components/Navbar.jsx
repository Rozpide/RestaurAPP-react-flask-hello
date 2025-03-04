import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/search-restaurants">
						<button className="btn btn-primary">Buscar Restaurantes</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/signup">
						<button className="btn btn-secondary">Registrarse</button>
					</Link>
				</div>
				<div className="ml-auto">
					<Link to="/login">
						<button className="btn btn-primary">Iniciar Sesión</button>
					</Link>
				</div>

			</div>
		</nav>
	);
};