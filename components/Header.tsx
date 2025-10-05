
import React from 'react';

const FlowerIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 3.5a1.5 1.5 0 013 0V5a1.5 1.5 0 01-3 0V3.5zM10 5c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3z" />
        <path d="M5 10a1.5 1.5 0 010-3H3.5a1.5 1.5 0 010 3H5z" />
        <path d="M16.5 8.5a1.5 1.5 0 013 0V10a1.5 1.5 0 01-3 0V8.5z" />
        <path d="M10 15a1.5 1.5 0 010 3v1.5a1.5 1.5 0 01-3 0V15a1.5 1.5 0 013 0z" />
        <path d="M8.5 16.5a1.5 1.5 0 01-3 0V15a1.5 1.5 0 013 0v1.5z" />
        <path d="M15 10a1.5 1.5 0 010 3h1.5a1.5 1.5 0 010-3H15z" />
        <path d="M3.5 11.5a1.5 1.5 0 013 0V13a1.5 1.5 0 01-3 0v-1.5z" />
        <path d="M11.5 3.5a1.5 1.5 0 013 0V5a1.5 1.5 0 01-3 0V3.5z" />
    </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/30 backdrop-blur-sm p-4 shadow-md border-b border-gray-700">
      <div className="container mx-auto flex items-center gap-4">
        <FlowerIcon />
        <div>
          <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-blue-400 to-pink-400">
            BloomWatch
          </h1>
          <p className="text-sm text-gray-400">by Resonans Co</p>
        </div>
      </div>
    </header>
  );
};
