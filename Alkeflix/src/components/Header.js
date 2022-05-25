//dependency
import { Link, Navigate, useNavigate } from "react-router-dom";
//components
import Buscador from "./Buscador";

function Header(props) {
  //obtengo el token para ver si esta loggeado, para poder cerrar la sesion desp
  let token = sessionStorage.getItem("token");
  const history = useNavigate();
  const closeSession = () => {
    sessionStorage.clear();
    history("/");
  };
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div classNameName="container">
          <h1 className="text-success">Alkeflix</h1>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Listado">
                List
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/favorites">
                Favorites
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center">
              <span className="text-success">
                {props.favorites.length > 0 && (
                  <> Favorites: {props.favorites.length}</>
                )}
              </span>
            </li>
          </ul>
        </div>
        <Buscador></Buscador>
        {token && (
          <>
            <button
              className="btn btn-success ml-2"
              type="submit"
              onClick={closeSession}
            >
              Log Out
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
export default Header;
