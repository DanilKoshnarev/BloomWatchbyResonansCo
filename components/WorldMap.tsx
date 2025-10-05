
import React from 'react';
import { BloomingEvent, Region } from '../types';
import { REGIONS } from '../constants';

interface WorldMapProps {
  data: BloomingEvent[];
  onRegionSelect: (regionId: string) => void;
  selectedRegionId: string | null;
}

const RegionPath: React.FC<{ region: Region; isSelected: boolean; hasEvent: boolean; onSelect: () => void; intensity: number }> = ({ region, isSelected, hasEvent, onSelect, intensity }) => {
  const intensityColor = `rgba(236, 72, 153, ${intensity / 10})`;
  const selectedColor = 'rgba(59, 130, 246, 0.6)';

  return (
    <g onClick={onSelect} className="cursor-pointer group">
      <path
        d={region.path}
        className={`transition-all duration-300 stroke-blue-300 stroke-2 ${isSelected ? 'fill-blue-500/50' : 'fill-gray-600/30 group-hover:fill-gray-500/40'}`}
      />
      {hasEvent && (
        <circle
          cx={getRegionCenter(region.id)[0]}
          cy={getRegionCenter(region.id)[1]}
          r={10 + intensity * 1.5}
          fill={intensityColor}
          className="pointer-events-none"
        >
          <animate
            attributeName="r"
            values={`${10 + intensity * 1.5};${12 + intensity * 2};${10 + intensity * 1.5}`}
            dur="2s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.8;1;0.8"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      )}
       {isSelected && hasEvent && (
        <circle
            cx={getRegionCenter(region.id)[0]}
            cy={getRegionCenter(region.id)[1]}
            r={15 + intensity * 2}
            fill="none"
            stroke={selectedColor}
            strokeWidth="2"
            className="pointer-events-none"
        >
             <animate
                attributeName="stroke-dasharray"
                values="0 200; 200 0"
                dur="1s"
                repeatCount="indefinite"
            />
        </circle>
      )}
      <text
        x={getRegionCenter(region.id)[0]}
        y={getRegionCenter(region.id)[1]}
        textAnchor="middle"
        dy="5"
        className="fill-white font-bold text-xs pointer-events-none"
      >
        {region.name}
      </text>
    </g>
  );
};

const getRegionCenter = (regionId: string): [number, number] => {
    const centers: { [key: string]: [number, number] } = {
        'north_america': [150, 90],
        'south_america': [190, 230],
        'africa': [350, 190],
        'europe': [350, 80],
        'asia': [530, 100],
        'oceania': [560, 250],
    };
    return centers[regionId] || [0, 0];
};

export const WorldMap: React.FC<WorldMapProps> = ({ data, onRegionSelect, selectedRegionId }) => {
  // FIX: Explicitly type the Map to help TypeScript infer the correct value type.
  const eventMap = new Map<string, BloomingEvent>(data.map(event => [event.regionId, event]));

  return (
    <div className="w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 700 300" className="w-full h-full">
        {REGIONS.map(region => (
            <RegionPath
                key={region.id}
                region={region}
                isSelected={selectedRegionId === region.id}
                hasEvent={eventMap.has(region.id)}
                onSelect={() => onRegionSelect(region.id)}
                intensity={eventMap.get(region.id)?.intensity || 0}
            />
        ))}
        </svg>
    </div>
  );
};
