# Weather App

A simple Angular application that fetches and displays current weather conditions and a 3-day forecast for a given city. Built with Angular 21, using RxJS for reactive data management, signals for state, and a responsive UI with modern styling.

## Running the App

1. Install dependencies: `npm install`
2. Start the development server: `npm start`
3. Open your browser to `http://localhost:4200`

The app uses the free GoWeather API (https://goweather.herokuapp.com/) for weather data.

## Building for Production

Run `npm run build` to compile the project. Artifacts are stored in `dist/`.

## Features

- Search for weather by city name
- Displays current temperature, description, and wind
- 3-day forecast with daily details
- Loading states, error handling, and responsive design
