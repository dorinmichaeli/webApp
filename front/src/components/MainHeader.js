import React from "react";

export default function Header(props) {
  return (
    <header className="header">
      <a href="#/">
        <header>CandyShop</header>
      </a>

      <div className="cart">
        <a href="#/cart">
          Cart
          {props.countCartItems ? (
            <button className="badge">{props.countCartItems}</button>
          ) : (
            ""
          )}
        </a>{" "}
      </div>
    </header>
  );
}
