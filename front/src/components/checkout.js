import './Checkout.css';


function onConfirmOrderHandler(userData) {
  fetch("http://localhost:5000/checkout", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
}
