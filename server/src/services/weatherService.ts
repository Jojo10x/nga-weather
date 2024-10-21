import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = 'c69d877bb014405794ce39cc3e25abe9';
const WEATHER_BASE_URL = 'https://api.weatherbit.io/v2.0';

export const fetchCurrentWeather = async (city: string, country: string) => {
  const response = await axios.get(`${WEATHER_BASE_URL}/current`, {
    params: {
      city,
      country,
      key: API_KEY,
    },
  });
  return response.data;
};

export const fetchWeatherForecast = async (city: string, country: string) => {
  const response = await axios.get(`${WEATHER_BASE_URL}/forecast/daily`, {
    params: {
      city,
      country,
      key: API_KEY,
    },
  });
  return response.data;
};