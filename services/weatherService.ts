import { WeatherData } from '../types';

export const fetchWeather = async (lat: number = 13.7563, lng: number = 100.5018): Promise<WeatherData> => {
  // Offline check
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      temp: 30,
      conditionCode: 0,
      conditionText: "Offline"
    };
  }

  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
    );
    const data = await response.json();
    
    if (data.current_weather) {
      const code = data.current_weather.weathercode;
      let conditionText = "Sunny";
      
      // Simple WMO code interpretation
      if (code <= 3) conditionText = "Clear/Cloudy";
      else if (code <= 48) conditionText = "Foggy";
      else if (code <= 67) conditionText = "Rainy";
      else if (code <= 77) conditionText = "Snowy"; // Unlikely in BKK
      else if (code <= 99) conditionText = "Stormy";

      return {
        temp: Math.round(data.current_weather.temperature),
        conditionCode: code,
        conditionText: conditionText
      };
    }
    
    throw new Error("No weather data");
  } catch (error) {
    console.error("Weather fetch failed", error);
    // Fallback data
    return {
      temp: 32,
      conditionCode: 0,
      conditionText: "Hot"
    };
  }
};