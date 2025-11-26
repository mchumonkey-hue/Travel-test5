import React, { useEffect, useState } from 'react';
import { MapPin, CloudSun, Sparkles } from 'lucide-react';
import { ThaiPattern, ElephantIcon } from './ThaiPattern';
import { fetchWeather } from '../services/weatherService';
import { getDailyThaiTip } from '../services/geminiService';
import { WeatherData, DaySchedule } from '../types';

interface HeroProps {
  currentDay: DaySchedule;
}

const HeroSection: React.FC<HeroProps> = ({ currentDay }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [tip, setTip] = useState<string>("");

  useEffect(() => {
    // Determine lat/long based on location string (Simple mock mapping)
    const lat = currentDay.location === 'Ayutthaya' ? 14.3532 : 13.7563;
    const lng = currentDay.location === 'Ayutthaya' ? 100.5684 : 100.5018;

    fetchWeather(lat, lng).then(setWeather);
    
    // Get AI Tip
    if (process.env.API_KEY) {
        getDailyThaiTip(currentDay.location, currentDay.items[0]?.title || 'touring')
        .then(setTip);
    } else {
        setTip("Welcome to Thailand! Enjoy the Land of Smiles.");
    }
  }, [currentDay]);

  return (
    <div className="relative bg-gradient-to-br from-thai-red via-thai-purple to-slate-900 text-white pb-6 pt-10 px-6 rounded-b-3xl shadow-xl overflow-hidden shrink-0 z-10 transition-all duration-500 ease-in-out">
      <ThaiPattern className="text-thai-gold opacity-20" />
      
      {/* Decorative Elephants */}
      <div className="absolute top-4 right-4 text-thai-gold opacity-30 animate-pulse">
        <ElephantIcon className="w-12 h-12" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
        <h2 className="text-thai-gold uppercase tracking-widest text-xs font-semibold">Current Location</h2>
        <div className="flex items-center space-x-2">
            <MapPin className="w-5 h-5 text-thai-gold" />
            <h1 className="text-3xl font-serif font-bold tracking-wide">{currentDay.location}</h1>
        </div>

        <div className="mt-4 flex items-center justify-center space-x-6 bg-white/10 backdrop-blur-md rounded-full px-6 py-2 border border-white/20">
            <div className="flex flex-col items-center">
                 <span className="text-sm opacity-80">{currentDay.weekday}</span>
                 <span className="text-xl font-bold font-serif">{currentDay.displayDate}</span>
            </div>
            <div className="h-8 w-px bg-white/30"></div>
            <div className="flex flex-col items-center">
                 <span className="text-sm opacity-80">Weather</span>
                 <div className="flex items-center space-x-1">
                    <CloudSun className="w-4 h-4 text-thai-gold" />
                    <span className="text-xl font-bold">{weather ? `${weather.temp}°` : '--'}</span>
                 </div>
            </div>
        </div>

        {tip && (
            <div className="mt-4 max-w-xs text-xs italic text-thai-silk/80 flex items-start justify-center gap-1">
                <Sparkles className="w-3 h-3 text-thai-gold shrink-0 mt-0.5" />
                <p>{tip}</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
