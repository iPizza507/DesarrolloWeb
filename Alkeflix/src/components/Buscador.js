//dependecy
import swtAlert from "@sweetalert/with-react";
import { useNavigate, Navigate } from "react-router-dom";

function Buscador() {
  const history = useNavigate();
  let token = sessionStorage.getItem("token");
  const submitHundler = (e) => {
    e.preventDefault();
    const keyboard = e.currentTarget.keyword.value;

    if (keyboard.length === 0) {
      swtAlert(<h2>Error</h2>);
    } else if (keyboard.length < 4) {
      swtAlert(<h2>Error, write more</h2>);
    } else {
      e.currentTarget.keyword.value = "";
      history(`/resultados?keyword=${keyboard}`);
    }
  };

  return (
    <>
      {!token && <Navigate to="/" />}
      <form className="d-flex align-item-center" onSubmit={submitHundler}>
        <label className="form-label mb-0 mt-1">
          <input type="text" name="keyword"></input>
        </label>
        <button className="btn btn-success mx-2" type="submit">
          Search
        </button>
      </form>
    </>
  );
}
export default Buscador;
