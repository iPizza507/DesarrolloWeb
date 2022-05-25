//library
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import swtAlert from "@sweetalert/with-react";

//components
import Login from "./components/Login";
import Listado from "./components/Listado";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Detalle from "./components/Detalle";
import Resultados from "./components/Resultados";
import Favorites from "./components/Favorites";

//styles
import "./css/bootstrap.min.css";
import "./css/app.css";

function App() {
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    const favInLocal = localStorage.getItem("favs");

    if (favInLocal !== null) {
      const favsArray = JSON.parse(favInLocal);
      setFavorites(favsArray);
    }
  }, []);

  const addOrRemoveFromFavs = (e) => {
    //esta levantando lo que esta en localStorage:
    const favMovies = localStorage.getItem("favs");
    //un nuevo array para guardar esos datos nuevos
    let tempMovieInFavs;
    //si no tengo nada en guardado
    if (favMovies === null) {
      //crear el array vacio..
      tempMovieInFavs = [];
      console.log(tempMovieInFavs);
    } else {
      //sino, convertir lo que ya tengo guardado en un JSON
      tempMovieInFavs = JSON.parse(favMovies);
      console.log("info");
    }
    //capturamos lo que seria el boton que DISPARA el evento, que hace funcionar a la funcionde APP
    const btn = e.currentTarget;
    //del boton que capturamos, queremos su elemento PADRE..
    const parent = btn.parentElement;
    //del elemento padre, buscamos sus datos a traves de atributos o texto..
    const imgURL = parent.querySelector("img").getAttribute("src");
    const tittle = parent.querySelector("h5").innerText;
    const overview = parent.querySelector("p").innerText;
    //a partir de esos datos, hacemos un objeto
    const movieData = {
      imgURL,
      tittle,
      overview,
      //hay una propiedad que se llama DATASET que busca todas las propiedades data-name..
      id: btn.dataset.movieId,
    };

    //buscar los objetos en el array
    let movieIsInArray = tempMovieInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });
    //si el objeto no está en el array valor null -> false
    if (!movieIsInArray) {
      //pushea el objeto a un array
      tempMovieInFavs.push(movieData);
      //setear los objetos del array localStorage con formato JSON
      localStorage.setItem("favs", JSON.stringify(tempMovieInFavs));
      setFavorites(tempMovieInFavs);
      swtAlert(<h2>This film has been added</h2>);
    } else {
      //elimina solo el objeto igual
      let movieLeft = tempMovieInFavs.filter((oneMovie) => {
        return oneMovie.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(movieLeft));
      setFavorites(movieLeft);
      swtAlert(<h2>This film has been eliminated</h2>);
    }
  };
  return (
    <>
      <Header favorites={favorites} />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route
          path="/listado"
          element={<Listado addOrRemoveFromFavs={addOrRemoveFromFavs} />}
        />
        <Route path="/detalle" element={<Detalle />} />
        <Route
          path="/resultados"
          element={<Resultados addOrRemoveFromFavs={addOrRemoveFromFavs} />}
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              addOrRemoveFromFavs={addOrRemoveFromFavs}
            />
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
