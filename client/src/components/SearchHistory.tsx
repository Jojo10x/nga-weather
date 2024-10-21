import React from 'react';
import { SearchHistoryItem } from '../types/types';
import styles from '../styles/SearchHistory.module.scss';

interface SearchHistoryProps {
  history: SearchHistoryItem[];
  onSelect: (city: string, country: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSelect }) => {
  return (
    <div className={styles.searchHistory}>
    <h2>Search History</h2>
    <ul>
      {history.map((item, index) => (
        <li 
          key={index} 
          onClick={() => onSelect(item.city, item.country)}
        >
          {item.city}, {item.country}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default SearchHistory;