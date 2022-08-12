
//import useState hook to create menu collapse state
import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';

import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from "react-bootstrap";

//import sidebar css from react-pro-sidebar module and our custom css 
import "./Header.css";

const Header = (props) => {  
  const nombre = localStorage.getItem('nombre');
  const correo = localStorage.getItem('correo');
  const foto = localStorage.getItem('foto');

  
  const logout = async e => {
    localStorage.removeItem('token');
    window.location.assign('/login');
  }
  
  useEffect(() => {

  }, []);   

  return (
    <div>
    <div className="header d-flex justify-content-between align-items-center">
      <div className="navbar-brand">inerBit</div>
        <Nav className="mr-auto" navbar>
          <NavItem className="d-flex align-items-center">            
          </NavItem>
          <div className="pp dropdown"><div className="profile-picture d-flex justify-content-center align-items-center">AA</div>
          <div className="dropdown-content">
            <div className="col-md-10"><div onClick={function(){logout()}}>Logout</div></div>
          </div> 
          </div>
        </Nav>       
      </div>
    </div>                      
  )
};

export default withRouter(Header);