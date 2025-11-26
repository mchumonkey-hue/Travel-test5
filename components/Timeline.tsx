import React from 'react';
import { DaySchedule, ItineraryItem } from '../types';
import { Map, Clock, Info, Ticket, Utensils, Train, Sparkles } from 'lucide-react';

interface TimelineProps {
  day: DaySchedule;
}

const getIcon = (type: ItineraryItem['type']) => {
  switch (type) {
    case 'food': return <Utensils className="w-4 h-4" />;
    case 'transport': return <Train className="w-4 h-4" />;
    case 'sightseeing': return <Map className="w-4 h-4" />;
    case 'activity': return <Ticket className="w-4 h-4" />;
    case 'relax': return <Sparkles className="w-4 h-4" />;
    default: return <Info className="w-4 h-4" />;
  }
};

const getColor = (type: ItineraryItem['type']) => {
  switch (type) {
    case 'food': return 'bg-orange-100 text-orange-700 border-orange-200';
    case 'transport': return 'bg-blue-100 text-blue-700 border-blue-200';
    case 'sightseeing': return 'bg-thai-gold/20 text-yellow-800 border-thai-gold/50';
    case 'activity': return 'bg-purple-100 text-purple-700 border-purple-200';
    case 'relax': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const Timeline: React.FC<TimelineProps> = ({ day }) => {
  return (
    <div className="px-4 pb-24 pt-4 space-y-6">
      {day.items.map((item, index) => (
        <div key={item.id} className="flex relative">
          {/* Timeline Line */}
          {index !== day.items.length - 1 && (
            <div className="absolute left-[3.2rem] top-8 bottom-[-1.5rem] w-0.5 bg-thai-gold/30 dashed-line"></div>
          )}

          {/* Time Column */}
          <div className="w-14 flex-shrink-0 flex flex-col items-center pt-2">
             <span className="text-sm font-bold text-gray-600">{item.time}</span>
          </div>

          {/* Card */}
          <div className={`flex-1 ml-4 p-4 rounded-2xl border ${getColor(item.type)} shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow`}>
            {/* Decoration */}
            <div className="absolute -right-4 -top-4 opacity-10 pointer-events-none">
                 <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
                    <circle cx="50" cy="50" r="40" />
                 </svg>
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <h3 className="font-serif font-bold text-lg leading-tight mb-1">{item.title}</h3>
                    <div className={`p-1.5 rounded-full bg-white/50 backdrop-blur-sm`}>
                        {getIcon(item.type)}
                    </div>
                </div>
                
                <p className="text-sm opacity-90 mb-3">{item.description}</p>

                <div className="flex items-center justify-between mt-2">
                    <span className="text-xs uppercase tracking-wide opacity-70 flex items-center gap-1">
                        <Map className="w-3 h-3" /> {item.location}
                    </span>
                    
                    {item.mapQuery && (
                        <a 
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.mapQuery)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs bg-white/80 hover:bg-white px-3 py-1.5 rounded-full font-medium shadow-sm transition-colors text-gray-800 flex items-center gap-1"
                        >
                            Open Map
                        </a>
                    )}
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
