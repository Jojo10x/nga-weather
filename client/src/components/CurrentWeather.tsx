import React from 'react';
import { WeatherData } from '../types/types';
import styles from '../styles/CurrentWeather.module.scss';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className={styles.currentWeather}>
      <h2>Current Weather in {data.city_name}, {data.country_code}</h2>
      <div className={styles.weatherInfo}>
        <div className={styles.infoItem}>
          <span className={styles.label}>Temperature</span>
          <span className={styles.value}>{data.temp}°C</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Feels like</span>
          <span className={styles.value}>{data.app_temp}°C</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Description</span>
          <span className={styles.value}>{data.weather.description}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Wind speed</span>
          <span className={styles.value}>{data.wind_spd} m/s</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Humidity</span>
          <span className={styles.value}>{data.rh}%</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Air Quality Index</span>
          <span className={styles.value}>{data.aqi}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.label}>Observation time</span>
          <span className={styles.value}>{data.ob_time}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;