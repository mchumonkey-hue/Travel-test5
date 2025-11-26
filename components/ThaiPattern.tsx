import React from 'react';

export const ThaiPattern: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute inset-0 opacity-10 pointer-events-none ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="thai-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
           <path d="M20 0 L40 20 L20 40 L0 20 Z" fill="none" stroke="currentColor" strokeWidth="1" />
           <circle cx="20" cy="20" r="5" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#thai-pattern)" />
    </svg>
  </div>
);

export const ElephantIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
         <path d="M20.5 13C20.5 13 19 12.5 18 13C17 13.5 16.5 15 16.5 15L15.5 14.5C15.5 14.5 15 13 14 12.5C13 12 12 12.5 11.5 13C11 13.5 11 14.5 11 14.5L10 14C10 14 10 12 9 11.5C8 11 7 11.5 6.5 12C6 12.5 6 13.5 6 13.5L4.5 13C4.5 13 4.5 11 3.5 10.5C2.5 10 1.5 10.5 1 11V18H3V22H5V18H7V22H9V18H14V22H16V18H18.5C19.5 18 20.5 17 20.5 16V13Z" />
         <path d="M16 8C16 10.2091 14.2091 12 12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8Z" />
    </svg>
);
