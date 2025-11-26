import React, { useState, useRef, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import Timeline from './components/Timeline';
import ExpenseTracker from './components/ExpenseTracker';
import { ITINERARY_DATA } from './constants';
import { Expense } from './types';
import { Wallet } from 'lucide-react';

const App: React.FC = () => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem('siam_journey_expenses');
    return saved ? JSON.parse(saved) : [];
  });
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  
  // Persist expenses
  useEffect(() => {
    localStorage.setItem('siam_journey_expenses', JSON.stringify(expenses));
  }, [expenses]);

  const handleAddExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const currentDay = ITINERARY_DATA[selectedDayIndex];

  // Scroll logic for sticky tabs visibility or smooth scrolling could go here
  // For now, we rely on standard CSS sticky positioning

  return (
    <div className="h-full flex flex-col bg-thai-silk relative">
      
      {/* Hero Section - Dynamic */}
      <HeroSection currentDay={currentDay} />

      {/* Sticky Date Selector */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-thai-gold/20">
        <div className="flex overflow-x-auto no-scrollbar py-3 px-4 gap-3 snap-x">
          {ITINERARY_DATA.map((day, index) => (
            <button
              key={day.date}
              onClick={() => setSelectedDayIndex(index)}
              className={`flex-shrink-0 snap-start flex flex-col items-center justify-center min-w-[4.5rem] py-2 px-1 rounded-xl transition-all duration-300 ${
                index === selectedDayIndex
                  ? 'bg-thai-purple text-white shadow-md scale-105 ring-2 ring-thai-gold ring-offset-1'
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <span className="text-xs font-medium uppercase tracking-wider">{day.weekday.substring(0, 3)}</span>
              <span className="text-lg font-bold font-serif leading-none mt-1">{day.displayDate}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden bg-thai-silk/50 relative">
         <Timeline day={currentDay} />
         
         {/* Bottom spacing for FAB */}
         <div className="h-24"></div>
      </div>

      {/* Floating Action Button for Wallet */}
      <button 
        onClick={() => setIsWalletOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-thai-gold text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-30 border-2 border-white"
        aria-label="Open Expenses"
      >
        <Wallet className="w-7 h-7" />
      </button>

      {/* Expense Modal */}
      <ExpenseTracker 
        isOpen={isWalletOpen} 
        onClose={() => setIsWalletOpen(false)}
        expenses={expenses}
        onAdd={handleAddExpense}
        onDelete={handleDeleteExpense}
      />

    </div>
  );
};

export default App;
