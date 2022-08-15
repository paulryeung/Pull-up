import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

function Navbar(props) {
  const location = useLocation();
  console.log("Current location url: ", location.pathname);

  const user = props.user;
  let nextPath = "";
  let nextPathName = "";

  if (location.pathname != "/signup") {
    nextPath = "/signup";
    nextPathName = "Sign Up";
  } else {
    nextPath = "/login";
    nextPathName = "Log In";
  }

  return (
    <nav className="Navbar">
      {user ? (
        <div className="navbar-container">
          <div className="pullup-logo-div">
            <h1>
              <span className="pullup-logo-p">P</span>ULLUP
            </h1>
          </div>

          <div className="nav-buttons-div">
            <h1>Home</h1>
            <h1>All Reservations</h1>
            <h1>Register Hosting</h1>
            <h1>My Hostings</h1>
          </div>
          <div className="signup-login-div">
            <h1>Welcome </h1>
            <img src={process.env.PUBLIC_URL + "images/usericon.png"} />
            <div className="logout" onClick={() => props.handleLogout()}>
              <h1>Logout</h1>
            </div>
          </div>
        </div>
      ) : (
        <div className="navbar-container">
          <div className="pullup-logo-div">
            <h1>
              <span className="pullup-logo-p">P</span>ULLUP
            </h1>
          </div>

          <div className="nav-buttons-div">
            <h1>WELCOME TO PULL UP!</h1>
          </div>
          <div className="signup-login-div">
            <img src={process.env.PUBLIC_URL + "images/usericon.png"} />
            <Link to={nextPath}>
              <h1>{nextPathName}</h1>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
