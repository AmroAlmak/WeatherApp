import "./App.css";
import { useEffect, useState } from "react";
import vedio from "./assets/pexels-kelly-9698456-3840x2160-24fps.mp4";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faCloud,
  faTint,
  faWind,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Switch,
  FormControlLabel,
} from "@mui/material";

function App() {
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("khartoum");
  const [input, setInput] = useState();
  const [currentTheme, setCurrentTheme] = useState("light");

  const lightTheme = createTheme();
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0543c421c2fd1d942405be5615449410`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();
      setWeather(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const handelsubmit = (e) => {
    e.preventDefault();
    setCity(input);
    setInput("");
  };

  const convertToReadableTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
    return formattedTime;
  };

  const handleThemeToggle = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    fetchData();
  }, [city]);

  return (
    <ThemeProvider theme={currentTheme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <div className="App">
        <video className="video-bg" autoPlay muted loop>
          <source src={vedio} type="video/mp4" />
          {/* Add additional source elements for different video formats if needed */}
        </video>
        <FormControlLabel
          control={
            <Switch
              checked={currentTheme === "dark"}
              onChange={handleThemeToggle}
              className="theme-switch"
              icon={
                <FontAwesomeIcon
                  icon={currentTheme === "dark" ? faSun : faMoon}
                />
              }
              checkedIcon={<FontAwesomeIcon icon={faSun} />}
              uncheckedIcon={<FontAwesomeIcon icon={faMoon} />}
            />
          }
        />
        <form onSubmit={handelsubmit}>
          <input
            value={input}
            type="text"
            placeholder="Enter city name"
            onChange={handleInput}
          />
          <button type="submit">Search</button>
        </form>
        {Object.keys(weather).length > 0 && (
          <div className="weather-card">
            <h1>{weather.name}</h1>
            <h1>{`${Math.floor(weather.main.temp - 273.15)} °`}</h1>
            <div className="weather-card__time">
              <h4>
                <FontAwesomeIcon icon={faCloud} />
                {weather.weather[0].description}
              </h4>
              <h4></h4>
              <h4>
                <FontAwesomeIcon icon={faTint} /> {weather.main.humidity}%
              </h4>
              {/* <h4>
                <FontAwesomeIcon icon={faWind} /> {weather.wind.speed}
              </h4> */}
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
