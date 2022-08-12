import React, { useEffect, useState } from "react";
import { API } from "../../config/api.common";
import Toast from "react-bootstrap/Toast";
import "./Register.css";

async function registerUser(userData) {
  return fetch(API.AUTH.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then((data) => data);
}

const Register = () => {  
  var [warning, setWarning] = useState();
  const [show, setShow] = useState(false);

  const [success, setSuccess] = useState(false)

  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordConfirmation, setPasswordConfirmation] = useState(); 
  const [confirmation, setConfirmation] = useState();    

  const handleSubmit = async (e) => {
    e.preventDefault();
    var user = await registerUser({
      username: username,
      email: email,
      password: password,
    });
    if (user.status === 201) {
      setSuccess(true);      
    } else if (user.status === 409) {
      setWarning("Ya hay un usuario registrado con ese usuario y/o correo");
      setShow(true);
    } else {
      setWarning("Ha ocurrido un error");
      setShow(true);
    }
  }; 

  const onChange = event => {    
    if (event.target.id === 'passConf') {
      if(event.target.value === password) {
        setConfirmation("Las contraseñas coinciden");
      } else {
        setConfirmation("Las contraseñas no coinciden");
      }
    } 
    if (event.target.id === 'pass') {
      if(event.target.value === passwordConfirmation) {
        setConfirmation("Las contraseñas coinciden");
      } else {
        setConfirmation("Las contraseñas no coinciden");
      }
    }        
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
        {
          !success ? (
            <div className="form-container col-md-5 d-flex align-items-center flex-column">
              <span className="title-form">Registrarse en inerBit</span>
              <form className="col-md-9" onSubmit={handleSubmit}>
                <div className="row d-flex ">
                  <div className="col-md-12">
                    <label>
                      <span>Nombre de usuario</span>
                      <input
                        name="username"
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                  <div className="col-md-12">
                    <label>
                      <span>Correo Electrónico</span>
                      <input
                        name="email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </label>
                  </div>
                </div>                
                <div className="row d-flex">
                  <div className="col-md-6">
                    <label>
                      <span>Contraseña</span>
                      <input name="password" type="password" id="pass" onChange={e => {setPassword(e.target.value); onChange(e)}} required/>
                    </label>
                  </div> 
                  <div className="col-md-6">
                    <label>
                      <span>Confirmar Contraseña</span>
                      <input name="passwordConfirmation" type="password" id="passConf" onChange={e => {setPasswordConfirmation(e.target.value); onChange(e)}} required/>
                    </label>
                    </div>  
                    <div className="password-utils d-flex justify-content-start">
                      <span>{confirmation}</span>
                    </div>                 
                  </div>                                     
                <div>
                  <button type="submit">Registrarse</button>
                </div>
              </form>
              <div style={{ marginTop: `1rem`, width: "75%", fontSize: "12px" }}>
                <span>
                  Al registrarte, estás aceptando las{" "}
                  <a href="">Condiciones de uso</a> y la{" "}
                  <a href="">Política de privacidad</a> de la compañía.
                </span>
              </div>
            </div>
          ) :(                      
            <div className="form-container col-md-5 d-flex align-items-center justify-content-center flex-column">
              <h3>Usuario registrado con éxito.</h3>
            </div>
          )
        }        
      </div>
    );  
};

export default Register;
