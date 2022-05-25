//dependencias
import axios from "axios";
import swtAlert from "@sweetalert/with-react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  let token = sessionStorage.getItem("token");
  const history = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const email = e.target.email.value;
    const password = e.target.password.value;
    //validacion de EMAIL y PASSWORD
    if (email === "" || password === "") {
      swtAlert(<h2>Los campos no pueden estar vacios</h2>);
      return;
    }
    if (email === "" && !regexEmail.test(email)) {
      swtAlert(<h2>Debes escribir una direccion de email válida</h2>);
      return;
    }
    if (email !== "challenge@alkemy.org" || password !== "react") {
      swtAlert(<h2>credenciales inválidas</h2>);
      return;
    }
    console.log("ready for sending form");
    //es igual que el fetch pero mejor
    axios
      .post("http://challenge-react.alkemy.org", { email, password })
      .then((res) => {
        swtAlert(<h2>Correct form</h2>);
        const tokenRes = res.data.token;
        //para guardar info, se necesita el nombre de la "caja" y la informacion que querramos guardar
        sessionStorage.setItem("token", tokenRes);
        //para ver la info, se necesita el nombre de la "caja"
        //sessionStorage.getItem("token");
        history("/listado");
      });
  };
  return (
    <>
      {token && <Navigate to="/listado" />}
      <form onSubmit={submitHandler} id="formLogin">
        <div className="container">
          <h2>Please, Login: </h2>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
            ></input>
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
            ></input>
          </div>

          <button type="submit" className="btn btn-success mt-2 mb-2">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}
export default Login;
