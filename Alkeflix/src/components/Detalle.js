//dependency
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Detalle() {
  let token = sessionStorage.getItem("token");
  //obitene el URL de la pagina en la que estas.
  let query = new URLSearchParams(window.location.search);
  //obtiene el ID en el URL.
  let movieID = query.get("movieID");

  //le damos un valor nulo pq asi esperamos q cargue primero y despues la pagina
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    //obtenemos la info de la pelicula desde la ID de la misma.
    let URLmovieID = `https://api.themoviedb.org/3/movie/${movieID}?api_key=f7a73bd84a681c9e825abf6e596b5fdb&language=en-US`;
    axios
      .get(URLmovieID)
      .then((res) => {
        let movieData = res.data;
        //metemos la info en el estado
        setMovie(movieData);
      })
      //captura algun error
      .catch((error) => {
        console.log(error);
      });
  }, [movieID]);

  return (
    <>
      {
        //si no encuentra el token (osea, si no está loggeado) lo redirige hacia el "Login"
        !token && <Navigate to="/" />
        //al contrario, muestra lo de abajo.
      }
      <div className="container mt-2 mb-2">
        <div className="row">
          {movie && (
            <>
              <div className="col-4">
                <img
                  className="img-fluid"
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={`img not found: ${movie.title}`}
                />
              </div>
              <div className="col-8">
                <h1>Title: {movie.title}</h1>
                <h2>Release date: {movie.release_date}</h2>
                <h3>Review:</h3>
                <p>{movie.overview}</p>
                <h4>Genre</h4>
                <ul>
                  {movie.genres.map((oneGenre) => {
                    return <li key={oneGenre.id}>{oneGenre.name}</li>;
                  })}
                </ul>
                <h6>Rating: {movie.vote_average}</h6>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
export default Detalle;
