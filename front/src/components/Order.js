import { useRef } from "react";

import Card from "./Card";
import classes from "./Order.css";

function Order(props) {
  const nameInputRef = useRef();
  const shippingAddressInputRef = useRef();
  const emailInputRef = useRef();
  const creditCardNumberInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredShippingAddress = shippingAddressInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredCreditCardNumbers = creditCardNumberInputRef.current.value;

    const userData = {
      fullName: enteredName,
      shippingAddress: enteredShippingAddress,
      email: enteredEmail,
      creditCardNumber: enteredCreditCardNumbers,
    };
    props.onConfirmOrder(userData);
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="fullName">Full Name</label>
          <input type="text" required id="fullName" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="shippingAddress">Shipping Address</label>
          <input
            type="text"
            required
            id="shippingAddress"
            ref={shippingAddressInputRef}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="email">Email</label>
          <input type="text" required id="email" ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="creditCardNumber">Credit Card Number</label>
          <input
            type="text"
            required
            id="creditCardNumber"
            ref={creditCardNumberInputRef}
          />
        </div>

        <div className={classes.actions}>
          <button>Confirm Order</button>
        </div>
      </form>
    </Card>
  );
}

export default Order;
