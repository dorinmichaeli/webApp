// import { useNavigate } from "navigation-react";
import { useNavigate } from "react-router-dom";
import Order from "./Order";
import "./Checkout.css";

function Checkout() {
  const history = useNavigate();

  function onConfirmOrderHandler(userData) {
    fetch("http://localhost:5000/checkout", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        history("/");
      })
      .catch((err) => console.error(err));
  }

  return (
    <section>
      <h1>Checkout</h1>
      <Order onConfirmOrder={onConfirmOrderHandler} />
    </section>
  );
}

export default Checkout;
