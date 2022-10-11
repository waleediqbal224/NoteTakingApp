import axios from "axios";
//WEATHER API

export const getWeatherOfCity = async (city) => {
  try {
    let weather = await axios.get(
      "http://api.weatherapi.com/v1/current.json?key=52dce03ecba24b3a882200356221909&q=" +
        city +
        "&aqi=no"
    );
    let location = weather.data.location.name;
    let temperature = weather.data.current.temp_c;
    return location + ": " + temperature + " degree Celcius";
  } catch (e) {}
  return weather.data.current.temp_c;
};
