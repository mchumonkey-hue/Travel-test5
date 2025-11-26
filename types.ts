export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  location: string;
  type: 'sightseeing' | 'food' | 'transport' | 'activity' | 'relax';
  description?: string;
  mapQuery?: string;
  icon?: string;
}

export interface DaySchedule {
  date: string; // YYYY-MM-DD
  displayDate: string; // 12/3
  weekday: string;
  location: string;
  items: ItineraryItem[];
}

export interface Expense {
  id: string;
  amount: number;
  currency: 'TWD' | 'THB';
  category: string;
  description: string;
  payer: 'A' | 'B'; // Assuming 2 people
  date: string;
}

export interface WeatherData {
  temp: number;
  conditionCode: number;
  conditionText: string;
}
