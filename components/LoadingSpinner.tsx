
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-gray-800/50 flex flex-col items-center justify-center z-10">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-200">Завантаження даних спостережень...</p>
    </div>
  );
};
