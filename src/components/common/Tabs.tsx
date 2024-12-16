import React from 'react';

interface TabProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

export const Tab: React.FC<TabProps> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`
      flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md
      transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
      ${active 
        ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }
    `}
  >
    {icon}
    <span>{label}</span>
  </button>
);

interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, className = '' }) => (
  <div className={`flex gap-1 p-1 bg-gray-50 rounded-lg ${className}`}>
    {children}
  </div>
);