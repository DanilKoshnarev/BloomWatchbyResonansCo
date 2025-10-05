
import React from 'react';
import { DifficultyLevel } from '../types';
import { MONTHS } from '../constants';

interface ControlPanelProps {
  difficulty: DifficultyLevel;
  onDifficultyChange: (level: DifficultyLevel) => void;
  selectedDate: { year: number; month: number };
  onDateChange: (date: { year: number; month: number }) => void;
  onRefresh: () => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  difficulty,
  onDifficultyChange,
  selectedDate,
  onDateChange,
  onRefresh,
}) => {
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i);

  return (
    <div className="flex flex-col space-y-6 h-full">
      <h2 className="text-xl font-semibold text-gray-200 border-b border-gray-600 pb-2">Панель керування</h2>
      
      {/* Difficulty Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Рівень складності</label>
        <div className="flex flex-col sm:flex-row rounded-md shadow-sm">
          {/* FIX: Use Object.keys to iterate over enum keys, not Object.values */}
          {(Object.keys(DifficultyLevel) as Array<keyof typeof DifficultyLevel>).map((levelKey) => (
            <button
              key={levelKey}
              onClick={() => onDifficultyChange(DifficultyLevel[levelKey])}
              className={`flex-1 px-4 py-2 text-sm font-medium border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200
                ${difficulty === DifficultyLevel[levelKey] ? 'bg-blue-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}
                first:rounded-t-md sm:first:rounded-l-md sm:first:rounded-tr-none last:rounded-b-md sm:last:rounded-r-md sm:last:rounded-bl-none`}
            >
              {DifficultyLevel[levelKey]}
            </button>
          ))}
        </div>
      </div>

      {/* Date Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Дата спостереження</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="year" className="sr-only">Рік</label>
            <select
              id="year"
              value={selectedDate.year}
              onChange={(e) => onDateChange({ ...selectedDate, year: parseInt(e.target.value) })}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {years.map(year => <option key={year} value={year}>{year}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="month" className="sr-only">Місяць</label>
            <select
              id="month"
              value={selectedDate.month}
              onChange={(e) => onDateChange({ ...selectedDate, month: parseInt(e.target.value) })}
              className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              {MONTHS.map(month => <option key={month.value} value={month.value}>{month.label}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex-grow"></div>
      
      {/* Refresh Button */}
      <button
        onClick={onRefresh}
        className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V4a1 1 0 011-1zm10 8a1 1 0 011-1h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 111.885-.666A5.002 5.002 0 0014.001 13H11a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
        Оновити дані
      </button>
    </div>
  );
};
