import React from "react";
import "./Card.css";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const Card: React.FC<Props> = ({ className = "", children }) => {
  const classes = "card " + className;

  return <div className={classes}>{children}</div>;
};

export default Card;
