
import './App.css';
import React, { useState } from 'react';
//import baseImg from ../src
const api = {
  key: "374aebcc57cf5b98e00047ac07c78a64",
  base: "https://api.openweathermap.org/data/2.5/"
}
function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('');
          setWeather(result);
          console.log(result);
        });
    }
  }
  const dateSetter = () => {
    let d = new Date();
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let year = d.getFullYear();
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let date = d.getDate();
    return `${day} ${date} ${month} ${year}`;
  }
  const imageUrl = require(`./assets/ryan-stone-BTlf1DxguXA-unsplash.jpg`)
  //(typeof weather.main !='undefined')? (((weather.main.temp)>20)?'app-warm':'app'):'app'  "url(" + { Background } + ")
  return (
    <div className='app' style={{backgroundImage: typeof weather.main != 'undefined' ? (`url("https://source.unsplash.com/weekly?${weather.weather[0].description}")`)
  : (`url(${imageUrl})`) }} >
      <main>
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != 'undefined'?
          (<div>
            <div className='location-box'>
              <div className='location'>{weather.name},{weather.sys.country}</div>
              <div className='date'>{dateSetter()}</div>
            </div>
            <div className='weather-box'>
              <div className='temp'>
                {weather.main.temp}℃
        </div>
              <div className='weather'> {weather.weather[0].description} </div>
            </div>
          </div>) : (<h2 className='no-location' >Search Right Location to get weather update</h2>)}
      </main>



    </div>
  );
}

export default App;
