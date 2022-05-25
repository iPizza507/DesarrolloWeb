//dependency
import { useEffect, useState } from "react";
import axios from "axios";
import swtAlert from "@sweetalert/with-react";
import { useNavigate, Link } from "react-router-dom";

function Resultados() {
  //keyword
  let query = new URLSearchParams(window.location.search);
  let keyword = query.get("keyword");
  //State
  const [movieResult, setMovieResult] = useState([]);
  //navegation
  const history = useNavigate();

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=f7a73bd84a681c9e825abf6e596b5fdb&language=en-US&page=1&include_adult=false&query=${keyword}`;
    axios
      .get(endPoint)
      .then((res) => {
        console.log(res);
        const moviesArray = res.data.results;
        setMovieResult(moviesArray);
        if (moviesArray.length === 0) {
          swtAlert(<h2>Your search is not found</h2>);
        }
        history(`/resultados?keyword=${keyword}`);
      })
      .catch((error) => {
        swtAlert(<h2>{error}</h2>);
      });
  }, [keyword]);

  return (
    <>
      {movieResult.length === 0 && <h1>Not results</h1>}

      <div className="container">
        <h2>Search... {keyword}</h2>
        <div className="row align-items-start">
          {movieResult.map((oneMovie, i) => {
            return (
              <div className="col-4 py-2 cardHover" key={i}>
                <div className="card">
                  <img
                    className="card-img-top"
                    src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`}
                    alt={`img not found: ${oneMovie.title}`}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{oneMovie.title}</h5>
                    <p className="card-text">{oneMovie.overview}</p>
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
export default Resultados;
