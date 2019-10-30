import React from "react";
import Card from './Card'

const CardContainer = (props) => {
  return <div className="card-container" >
    {props.foxes.map((fox => {
      return <Card fox={fox} key={fox.id} handleShowClick={props.handleShowClick}/>
    }))}
  </div>;
};

export default CardContainer;
