import React, { useEffect, useState } from 'react';
import { fetchWeatherForecast } from '../api/weather';
import toast from 'react-hot-toast';

// Define the WeatherForecast interface
export interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

export default function WeatherForecast() {
  const [weatherData, setWeatherData] = useState<WeatherForecast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWeather = async () => {
      try {
        const data = await fetchWeatherForecast(); // Fetch weather data
        setWeatherData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching weather data:', error); // Log the error
        toast.error('Failed to load weather data. Please try again.');
        setLoading(false);
      }
    };

    loadWeather();
  }, []);

  if (loading) {
    return <p>Loading weather data...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Weather Forecast</h1>
      {weatherData.length === 0 ? (
        <p>No weather data available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weatherData.map((forecast, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 border"
            >
              <p className="font-semibold">Date: {forecast.date}</p>
              <p>Temperature (C): {forecast.temperatureC}°C</p>
              <p>Temperature (F): {forecast.temperatureF}°F</p>
              <p>Summary: {forecast.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
