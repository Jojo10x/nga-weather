import React, { useEffect, useRef, useState } from 'react';
import { ForecastData } from '../types/types';
import styles from '../styles/Forecast.module.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ForecastProps {
  data: ForecastData;
}

const Forecast: React.FC<ForecastProps> = ({ data }) => {
  const [visibleItems, setVisibleItems] = useState<number>(1);
  const [startIndex, setStartIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateVisibleItems = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const itemWidth = 200;
        const itemsToShow = Math.floor(containerWidth / itemWidth);
        setVisibleItems(Math.max(1, itemsToShow));
      }
    };

    updateVisibleItems();
    window.addEventListener('resize', updateVisibleItems);

    return () => window.removeEventListener('resize', updateVisibleItems);
  }, []);
  
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <p>No forecast data available.</p>;
  }

  const scroll = (direction: 'left' | 'right') => {
    setStartIndex((prevIndex) => {
      if (direction === 'left') {
        return Math.max(0, prevIndex - 1);
      } else {
        return Math.min(data.length - visibleItems, prevIndex + 1);
      }
    });
  };

  return (
    <div className={styles.forecast}>
      <h2>16-Day Forecast</h2>
      <div className={styles.forecastContainer} ref={containerRef}>
        <button 
          className={styles.scrollButton} 
          onClick={() => scroll('left')}
          disabled={startIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>
        <div className={styles.forecastList}>
          {data.slice(startIndex, startIndex + visibleItems).map((day) => (
            <div key={day.datetime} className={styles.forecastItem}>
              <h3>{day.datetime}</h3>
              <p>Max temp: {day.max_temp}°C</p>
              <p>Min temp: {day.min_temp}°C</p>
              <p>Description: {day.weather.description}</p>
              <p>Precipitation: {day.precip} mm</p>
              <p>UV Index: {day.uv}</p>
              <p>Wind: {day.wind_cdir_full} at {day.wind_spd} m/s</p>
            </div>
          ))}
        </div>
        <button 
          className={styles.scrollButton} 
          onClick={() => scroll('right')}
          disabled={startIndex + visibleItems >= data.length}
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Forecast;