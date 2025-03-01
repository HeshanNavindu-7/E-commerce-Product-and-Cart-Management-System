import axios from 'axios';

const API_BASE_URL = 'http://localhost:5132'; 

export const fetchWeatherForecast = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/WeatherForecast`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error; 
  }
};
