import React, { useState } from "react";
import { Input, Button } from "reactstrap";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../Graphql/Queries";

function Home() {
  const [cityDetails, setCityDetails] = useState("");
  const [getWeather, {loading,data, error }]= useLazyQuery(GET_WEATHER_QUERY, {
   
    variables: { name: cityDetails },
  });
  let help;

  if(loading) return<h3>Loading</h3>
  if (error) return <h1>error</h1>;
  if (data) {
    console.log(data);
  }

  function handleSubmit (){
    setCityDetails(help)
    getWeather()
   
    
  }
  
  const handleChange= (e) => {
      help=e.target.value;
      
  }

  return (
    <>
      <div className="row justify-content-center">
        <h1 className="text-center">Search weather</h1>
        <Input
          
          className="col-1 w-25 align-center"
          type="text"
          placeholder="city name"
          onChange={handleChange}
        />
        <Button onClick={handleSubmit} className="col-1">
          Search
        </Button>
      </div>
      
      <div className="weather">
     
        {data &&  (
          <>
            <h1> {data.getCityByName.name} </h1>
            <h1>
              {" "}
              Temperature: {data.getCityByName.weather.temperature.actual}
            </h1>
            <h1>
              Description: {data.getCityByName.weather.summary.description}
            </h1>
            <h1>Wind Speed: {data.getCityByName.weather.wind.speed}</h1>
          </>
        )}
      </div>
    </>
  );
}

export default Home;
