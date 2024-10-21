import express from 'express';
import { getCurrentWeather, getForecast, getSearchHistory,addSearchHistory } from '../controllers/weatherController';

const router = express.Router();

router.get('/current', getCurrentWeather);
router.get('/forecast', getForecast);
router.get('/history', getSearchHistory);
router.post('/history', addSearchHistory); 

export default router;