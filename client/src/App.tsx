import React, {  useEffect, useState } from 'react';
import WeatherSearch from './components/WeatherSearch';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import SearchHistory from './components/SearchHistory';
import { WeatherData, ForecastData, SearchHistoryItem } from './types/types';
import '../src/styles/App.scss';

const App: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  const fetchHistory = async () => {
    try {
      const historyResponse = await fetch('/api/weather/history');
      if (!historyResponse.ok) {
        const errorText = await historyResponse.text();
        throw new Error(`Error fetching history: ${historyResponse.statusText} - ${errorText}`);
      }
      const historyData = await historyResponse.json();
      setSearchHistory(historyData);
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSearch = async (city: string, country: string) => {
    try {
      const currentResponse = await fetch(`/api/weather/current?city=${city}&country=${country}`);
      if (!currentResponse.ok) {
        const errorText = await currentResponse.text();
        throw new Error(`Error fetching current weather: ${errorText}`);
      }
  
      const currentData = await currentResponse.json(); 
      setCurrentWeather(currentData.data[0]);
  
      const forecastResponse = await fetch(`/api/weather/forecast?city=${city}&country=${country}`);
      if (!forecastResponse.ok) {
        const errorText = await forecastResponse.text();
        throw new Error(`Error fetching forecast: ${forecastResponse.statusText} - ${errorText}`);
      }
  
      const forecastData = await forecastResponse.json(); 
      setForecast(forecastData.data);
  
      await fetch('/api/weather/history', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city, country }),
      });

      fetchHistory(); 
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  
  return (
    <div className="app">
      <h1>Weather App</h1>
      <WeatherSearch onSearch={handleSearch} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      <SearchHistory history={searchHistory} onSelect={handleSearch} />
    </div>
  );
};

export default App;