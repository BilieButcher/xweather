import React from "react";
import "./Card.css"

const Card = ({title, info}) => {
    return (
    
    <div className="weather-card">
        <h1>{title}</h1>
        <p>{info}</p>
    

    </div>        
    )
}
export default Card;