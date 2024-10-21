import express from 'express';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes';

const app = express();

app.use(cors({ origin: ['http://localhost:5173','https://nga-weather.onrender.com'], credentials: true })); 
app.use(express.json());

app.use('/api/weather', weatherRoutes);

export default app;

