import React from "react";
import logoImg from "../assets/logo.png";

const Header = () => {
  return (
    <header>
      <img src={logoImg} alt="place image" />
      <h1>PlacePicker</h1>
      <p>
        Create your personal collection of places you would like to visit or you
        have visited.
      </p>
    </header>
  );
};

export default Header;
