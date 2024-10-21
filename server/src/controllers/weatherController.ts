import { Request, Response } from 'express';
import axios from 'axios';
import { cache } from '../utils/cache';
import SearchHistory from '../models/SearchHistory';

const API_KEY = 'c69d877bb014405794ce39cc3e25abe9';
const BASE_URL = 'https://api.weatherbit.io/v2.0';

export const getCurrentWeather = async (req: Request, res: Response) => {
  try {
    const { city, country } = req.query;
    console.log(`Fetching weather for city: ${city}, country: ${country}`); 

    const cacheKey = `current:${city},${country}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${BASE_URL}/current`, {
      params: { city, country, key: API_KEY },
    });
    console.log('Weatherbit response:', response.data);

    cache.set(cacheKey, response.data, 600);
    await SearchHistory.create({ city, country });

    res.json(response.data);
  } catch (error) {
    console.error('Failed to fetch current weather data:', error); 
    res.status(500).json({ error: 'Failed to fetch current weather data' });
  }
};

export const getForecast = async (req: Request, res: Response) => {
  try {
    const { city, country } = req.query;
    const cacheKey = `forecast:${city},${country}`;

    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return res.json(cachedData);
    }

    const response = await axios.get(`${BASE_URL}/forecast/daily`, {
      params: { city, country, key: API_KEY, days: 16 },
    });

    cache.set(cacheKey, response.data, 600); 

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch forecast data' });
  }
};

export const getSearchHistory = async (req: Request, res: Response) => {
  try {
    const history = await SearchHistory.find().sort({ createdAt: -1 }).limit(5);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search history' });
  }
};

export const addSearchHistory = async (req: Request, res: Response) => {
  const { city, country } = req.body;

  try {
    const newHistoryItem = new SearchHistory({ city, country });
    await newHistoryItem.save();
    res.status(201).json(newHistoryItem);
  } catch (error) {
    console.error('Failed to save search history:', error);
    res.status(500).json({ error: 'Failed to save search history' });
  }
};