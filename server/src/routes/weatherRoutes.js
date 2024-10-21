"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weatherController_1 = require("../controllers/weatherController");
const router = express_1.default.Router();
router.get('/current', weatherController_1.getCurrentWeather);
router.get('/forecast', weatherController_1.getForecast);
router.get('/history', weatherController_1.getSearchHistory);
router.post('/history', weatherController_1.addSearchHistory);
exports.default = router;
