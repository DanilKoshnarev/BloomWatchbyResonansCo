
import React from 'react';
import { BloomingEvent, Region } from '../types';

interface DataDisplayProps {
  event: BloomingEvent | null;
  region: Region | null;
}

// FIX: Changed icon type from JSX.Element to React.ReactNode to avoid namespace issues.
const InfoCard: React.FC<{ title: string; children: React.ReactNode; icon: React.ReactNode }> = ({ title, children, icon }) => (
    <div className="bg-gray-700/50 p-3 rounded-lg">
        <div className="flex items-center gap-2 mb-1">
            {icon}
            <h4 className="font-semibold text-sm text-gray-300">{title}</h4>
        </div>
        <div className="text-gray-200 text-sm pl-6">{children}</div>
    </div>
);

const PlantIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.536 6.464a.5.5 0 01.707 0l2.5 2.5a.5.5 0 010 .707l-2.5 2.5a.5.5 0 01-.707-.707L11.293 10 9.536 8.172a.5.5 0 010-.707zM5 10a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5z" clipRule="evenodd" /></svg>;
const InsightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor"><path d="M10 2a6 6 0 00-6 6c0 1.887.643 3.61 1.688 4.932l-1.688 1.688a1 1 0 000 1.414l1.414 1.414a1 1 0 001.414 0l1.688-1.688A5.968 5.968 0 0010 14a6 6 0 000-12zm0 10a4 4 0 110-8 4 4 0 010 8z" /></svg>;
const AdviceIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" /></svg>;
const ModelIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-purple-400" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" /></svg>;


export const DataDisplay: React.FC<DataDisplayProps> = ({ event, region }) => {
  if (!event || !region) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">Оберіть регіон на мапі для перегляду деталей.</p>
      </div>
    );
  }

  const intensityColor = `hsl(${(10 - event.intensity) * 12}, 80%, 60%)`;

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b border-gray-600 pb-2 mb-3">
        <div>
          <h3 className="text-lg font-bold text-white">{event.eventName}</h3>
          <p className="text-sm text-gray-400">{region.name} | Пік цвітіння: {event.peakBloomDate}</p>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-sm text-gray-300">Інтенсивність:</span>
          <div className="w-24 bg-gray-600 rounded-full h-2.5">
            <div className="h-2.5 rounded-full" style={{ width: `${event.intensity * 10}%`, backgroundColor: intensityColor }}></div>
          </div>
        </div>
      </div>
      
      <p className="text-sm text-gray-300 mb-4">{event.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <InfoCard title="Види рослин" icon={<PlantIcon/>}>
            <p className="italic">{event.plantSpecies.join(', ')}</p>
        </InfoCard>

        <InfoCard title="Погляд запилювача" icon={<InsightIcon/>}>
            <p>{event.pollinatorInsight}</p>
        </InfoCard>

        {event.monitoringAdvice && (
          <InfoCard title="Поради з моніторингу" icon={<AdviceIcon/>}>
            <p>{event.monitoringAdvice}</p>
          </InfoCard>
        )}

        {event.predictionModel && (
          <InfoCard title="Прогностична модель" icon={<ModelIcon/>}>
            <p>{event.predictionModel}</p>
          </InfoCard>
        )}
      </div>
    </div>
  );
};
