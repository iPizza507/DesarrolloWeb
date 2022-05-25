//dependency
import { Link, Navigate } from "react-router-dom";

function Favorites(props) {
  let token = sessionStorage.getItem("token");
  return (
    <>
      {!token && <Navigate to="/" />}
      <div className="container">
        <div className="row align-items-start">
          {!props.favorites.length && (
            <div className="col-12 text-danger div-h1-danger">
              <h1 className="m-3">SORRY! NOT FOUND FAVORITES :c</h1>
            </div>
          )}
          {props.favorites.map((oneMovie, i) => {
            return (
              <div className="col-4 p-2 cardHover" key={i}>
                <div className="card">
                  <img
                    className="card-img-top"
                    src={oneMovie.imgURL}
                    alt={`img not found: ${oneMovie.title}`}
                  />
                  <button
                    className="favorite-btn"
                    //aca le pasamos la prop para que ejecute la funcion
                    onClick={props.addOrRemoveFromFavs}
                    data-movie-id={oneMovie.id}
                  >
                    💗
                  </button>

                  <div className="card-body">
                    <h5 className="card-title">{oneMovie.title}</h5>
                    <p className="card-text">
                      {oneMovie.overview.slice(0, 50) + "..."}
                    </p>
                    <Link
                      to={`/detalle?movieID=${oneMovie.id}`}
                      className="btn btn-primary"
                    >
                      View detail
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default Favorites;
