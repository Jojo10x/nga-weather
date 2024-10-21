This is a full-stack weather application that allows users to view real-time weather conditions and a 16-day forecast for any city. Built using React (client-side) and Node.js (server-side) with TypeScript for type safety, it integrates the Weatherbit API to retrieve weather data and leverages MongoDB to store search history. The app is designed to be responsive and user-friendly, offering key features like current weather, forecasts, and search history tracking.

Features

Current Weather: View real-time weather conditions for any location.
16-Day Weather Forecast: Get detailed forecasts, including temperature, precipitation, and more.
Search History: Automatically logs recent searches, allowing users to view their weather search history.
API Requests: Server-side logic manages API calls to the Weatherbit API for fetching current and forecasted weather data.
Responsive Design: The application is fully responsive and accessible across different devices.
Dark/Light Mode Support: Choose between light or dark theme for optimal viewing.
User Authentication (Upcoming): Login functionality to save personalized weather data and settings.

Tech Stack

Frontend: React, TypeScript, SCSS (for styling)
Backend: Node.js, Express.js, MongoDB
API Integration: Weatherbit API
State Management: React Hooks
Routing: React Router
Database: MongoDB (for storing search history)

Running the Application
Client-Side (Development Build)
To start the frontend React application in development mode:

cd client
npm run dev
Server-Side (Development Build)
To start the Node.js backend server:

cd server
npm run dev

Deployment
The application is hosted on Render, providing a scalable and reliable environment for both the frontend and backend. MongoDB is used for managing persistent data such as user search history.

Live site: https://weathernga.onrender.com

Upcoming:
User Authentication: Personalized settings and saved searches.
