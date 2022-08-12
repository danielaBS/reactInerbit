import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import Toast from "react-bootstrap/Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faEye } from "@fortawesome/free-solid-svg-icons";

import useToken from '../../app/useToken';
import {getUser} from '../../app/authAPI';

import "./Login.css";

const eye = <FontAwesomeIcon icon={faEye} />;

const Login = () => {  
  var [warning, setWarning] = useState();
  const [show, setShow] = useState(false);
  
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  var { token, setToken } = useToken();
  
  const [state, setState] = useState(false);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    token = await doGetUser({
      username: username,
      password: password
    });
    if(token) {
      setToken(token);        
      window.location.assign("/dashboard");
    } else {
      setWarning("Nombre de usuario o contraseña incorrectos");
      setShow(true);
    } 
  };

  const doGetUser = async (data) => {
    const result = await getUser(data);
    if(result !== "error") { 
      if(result['password'] === password) {
        let token = "test123";
        return token;
      } else {
        setWarning("Contraseña incorrecta");
        setShow(true);
      }
    } else {
      setWarning("Nombre de usuario incorrecto");
      setShow(true);
    }
  };

  const togglePasswordVisiblity = () => {
    setState(state ? false : true);
  };

  return (
    <div className="d-flex justify-content-center align-items-center container-comp">
      <Toast
        bg="warning"
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Body>{warning}</Toast.Body>
      </Toast>
      <div className="form-container col-md-10 col-lg-5 d-flex justify-content-center align-items-center flex-column">
        <span className="title-form">Iniciar Sesión</span>      
        <form className="col-md-10 col-lg-8" onSubmit={handleSubmit}>
          <label>
            <span>Nombre de usuario</span>
            <input
            name="username"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
            />
            </label>
            <label className="pass-wrapper">
              <span>Contraseña</span>
              <input
              type={state ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
              <i onClick={togglePasswordVisiblity}>{eye}</i>
            </label>
            <div className="password-utils">              
              <a href="/account-recovery">¿Olvidaste tu contraseña?</a>
            </div>
            <div>
              <button type="submit">Iniciar Sesión</button>
            </div>
          </form>                           
        <div style={{ marginTop: `1rem` }}>
          <span>
            ¿Nuevo en enerBit? <a href="/register">Crea una cuenta</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Login);
