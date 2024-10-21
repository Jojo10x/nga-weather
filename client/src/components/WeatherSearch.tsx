import React, { useState } from 'react';
import styles from '../styles/WeatherSearch.module.scss';

interface WeatherSearchProps {
  onSearch: (city: string, country: string) => void;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 

    if (!city.trim()) {
      setError('City is required.');
      return;
    }

    if (!country.trim() || country.length !== 2) {
      setError('Please provide a valid 2-letter country code.');
      return;
    }

    try {
      await onSearch(city, country);
    } catch (error) {
      console.error('Failed to fetch weather data:', error);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
        required
      />
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Enter country code"
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">Search</button>
    </form>
  );
};

export default WeatherSearch;