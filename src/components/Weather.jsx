import React, { useState } from "react";
import Card from "./Card";
import "./Weather.css"
import axios from "axios";
const Weather = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [weather, setWeather] = useState({temp: "" , humidity: "" , condition: "" , wind:"" });
    const [input, setInput] = useState("");
    const handleOnChange = (e) => {
        setInput(e.target.value)
    }

    const handleOnClick = async () => {
        setIsLoading(true);
        try{

        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=3b0dc46b96e440fa95f64846250303&q=${input}`);
        // console.log(response.data.current.temp_c)
        setWeather({...weather, temp:response.data.current.temp_c , humidity:response.data.current.humidity , condition: response.data.current.condition.text, wind:response.data.current.wind_kph});
        console.log(weather);
        }catch(error){
            if(error.response.status === 400){
                alert("Failed to fetch weather data");
                setWeather({...weather , temp:""})
            }
            
        }
        setIsLoading(false)

    }
    return (
        <div>

            <input className= "search-bar" type="search" placeholder="Enter city name" onChange={(e) => {handleOnChange(e)}}></input>
            <button className="search-button" onClick={handleOnClick}>Search</button>
            {isLoading ? <p style={{color:"green"}}>...Loading</p> : () => {return;}}
           {weather.temp && !isLoading ? <div className="weather-cards">
            <Card
            title={"Temperature"}
            info={weather.temp + "°C"}
            />

<Card
            title={"Humidity"}
            info={weather.humidity+"%"}
            />

<Card
            title={"Condition"}
            info={weather.condition}
            />

<Card
            title={"Wind Speed"}
            info={weather.wind+" kph"}  
            />

            </div> : () => {return;}}
        </div>
    )
}
export default Weather;