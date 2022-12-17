import React from "react";
import classes from "./Card.css";
import "./Card.css";

const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
