import React from "react";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";

function MainNavigation(props) {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        <span /> <span /> <span />
      </button>
      <h1 className="main-navigation__title">CandyShop</h1>
      <nav>
        <NavLinks />
      </nav>
    </MainHeader>
  );
}

export default MainNavigation;
