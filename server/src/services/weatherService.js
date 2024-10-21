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
exports.fetchWeatherForecast = exports.fetchCurrentWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_KEY = 'c69d877bb014405794ce39cc3e25abe9';
const WEATHER_BASE_URL = 'https://api.weatherbit.io/v2.0';
const fetchCurrentWeather = (city, country) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${WEATHER_BASE_URL}/current`, {
        params: {
            city,
            country,
            key: API_KEY,
        },
    });
    return response.data;
});
exports.fetchCurrentWeather = fetchCurrentWeather;
const fetchWeatherForecast = (city, country) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`${WEATHER_BASE_URL}/forecast/daily`, {
        params: {
            city,
            country,
            key: API_KEY,
        },
    });
    return response.data;
});
exports.fetchWeatherForecast = fetchWeatherForecast;
