import "./index.css"
import React from 'react';
import ReactDOM from 'react-dom';

import { useState, useEffect } from "react";
import axios from "axios";

let num1 = 0;



function Hi() {


  const [data, setData] = useState(0);
  const [cityName, setCityName] = useState("");
  const [weather, setWeather] = useState({});



  const submitHandler = (e) => {
    e.preventDefault();

    console.log("city: " + cityName);

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
      .then(function (response) {

        console.log("data: ", response.data);

        setWeather(response.data)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect(() => {
    const getWeather = () => { // get current weather 
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=e0f99c494c2ce394a18cc2fd3f100543&units=metric`)
        .then(function (response) {

          console.log("data: ", response.data);
          setWeather(response.data)

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
    }
    getWeather();
  }, [])



  return <div>





    <hr />


    <center><h1 className="head">
      Weather App:
    </h1>

    <form onSubmit={submitHandler}>

      <input className="bx"
        type="text"
        placeholder='enter your city name'
        onChange={(e) => {
          setCityName(e.target.value)
        }}
      />

      <button  className="go" type="submit">Get Weather</button>

    </form></center>

    <br />

    {(weather?.name)?

<center><div className="ans">
        <div>Weather of {weather?.name}</div>
        <div>Current Temp {weather?.main?.temp}</div>
      </div></center>
      :
      null
    }

  </div>;
}

ReactDOM.render(<Hi />, document.querySelector('#root'));