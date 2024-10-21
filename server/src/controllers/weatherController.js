"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSearchHistory = exports.getSearchHistory = exports.getForecast = exports.getCurrentWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const cache_1 = require("../utils/cache");
const SearchHistory_1 = __importDefault(require("../models/SearchHistory"));
const API_KEY = 'c69d877bb014405794ce39cc3e25abe9';
const BASE_URL = 'https://api.weatherbit.io/v2.0';
const getCurrentWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city, country } = req.query;
        console.log(`Fetching weather for city: ${city}, country: ${country}`);
        const cacheKey = `current:${city},${country}`;
        const cachedData = cache_1.cache.get(cacheKey);
        if (cachedData) {
            return res.json(cachedData);
        }
        const response = yield axios_1.default.get(`${BASE_URL}/current`, {
            params: { city, country, key: API_KEY },
        });
        console.log('Weatherbit response:', response.data);
        cache_1.cache.set(cacheKey, response.data, 600);
        yield SearchHistory_1.default.create({ city, country });
        res.json(response.data);
    }
    catch (error) {
        console.error('Failed to fetch current weather data:', error);
        res.status(500).json({ error: 'Failed to fetch current weather data' });
    }
});
exports.getCurrentWeather = getCurrentWeather;
const getForecast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { city, country } = req.query;
        const cacheKey = `forecast:${city},${country}`;
        const cachedData = cache_1.cache.get(cacheKey);
        if (cachedData) {
            return res.json(cachedData);
        }
        const response = yield axios_1.default.get(`${BASE_URL}/forecast/daily`, {
            params: { city, country, key: API_KEY, days: 16 },
        });
        cache_1.cache.set(cacheKey, response.data, 600);
        res.json(response.data);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
});
exports.getForecast = getForecast;
const getSearchHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const history = yield SearchHistory_1.default.find().sort({ createdAt: -1 }).limit(5);
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch search history' });
    }
});
exports.getSearchHistory = getSearchHistory;
const addSearchHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city, country } = req.body;
    try {
        const newHistoryItem = new SearchHistory_1.default({ city, country });
        yield newHistoryItem.save();
        res.status(201).json(newHistoryItem);
    }
    catch (error) {
        console.error('Failed to save search history:', error);
        res.status(500).json({ error: 'Failed to save search history' });
    }
});
exports.addSearchHistory = addSearchHistory;
