import React from "react";

const Card = props => {
  return (
    <div className="card" onClick={() => props.handleShowClick(props.fox)}>
      <img src={props.fox.img_url} alt={props.fox.name} />
      <h3>{props.fox.name}</h3>
      <p>Click To Edit</p>
    </div>
  );
};

export default Card;
