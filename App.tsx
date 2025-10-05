
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { WorldMap } from './components/WorldMap';
import { DataDisplay } from './components/DataDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { fetchBloomingData } from './services/geminiService';
import { BloomingEvent, DifficultyLevel, Region } from './types';
import { REGIONS, INITIAL_DATE } from './constants';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(DifficultyLevel.Beginner);
  const [selectedDate, setSelectedDate] = useState<{ year: number; month: number }>(INITIAL_DATE);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [bloomingData, setBloomingData] = useState<BloomingEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<BloomingEvent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const regionMap = useMemo(() => new Map(REGIONS.map(r => [r.id, r])), []);

  const handleFetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setSelectedEvent(null);
    setBloomingData([]);

    try {
      const data = await fetchBloomingData(difficulty, selectedDate);
      setBloomingData(data);
    } catch (err) {
      console.error("Failed to fetch blooming data:", err);
      setError("Не вдалося завантажити дані про цвітіння. Спробуйте оновити сторінку або змінити параметри.");
    } finally {
      setIsLoading(false);
    }
  }, [difficulty, selectedDate]);

  useEffect(() => {
    handleFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, selectedDate]);

  const handleRegionSelect = useCallback((regionId: string) => {
    const region = regionMap.get(regionId) || null;
    setSelectedRegion(region);
    const eventForRegion = bloomingData.find(event => event.regionId === regionId) || null;
    setSelectedEvent(eventForRegion);
  }, [bloomingData, regionMap]);

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col lg:flex-row p-4 gap-4">
        <aside className="w-full lg:w-80 xl:w-96 flex-shrink-0 bg-gray-800/50 rounded-lg p-4 shadow-lg backdrop-blur-sm border border-gray-700">
          <ControlPanel
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onRefresh={handleFetchData}
          />
        </aside>
        <div className="flex-grow flex flex-col gap-4 min-h-[60vh] lg:min-h-0">
          <div className="flex-grow bg-gray-800/50 rounded-lg p-4 relative shadow-lg backdrop-blur-sm border border-gray-700 flex items-center justify-center overflow-hidden">
            {isLoading && <LoadingSpinner />}
            {error && !isLoading && <p className="text-red-400 text-center">{error}</p>}
            {!isLoading && !error && bloomingData.length > 0 && (
              <WorldMap 
                data={bloomingData} 
                onRegionSelect={handleRegionSelect}
                selectedRegionId={selectedRegion?.id ?? null} 
              />
            )}
            {!isLoading && !error && bloomingData.length === 0 && (
                <p className="text-gray-400 text-center">Дані про цвітіння для вибраного періоду не знайдено.</p>
            )}
          </div>
          <div className="h-auto lg:h-64 flex-shrink-0 bg-gray-800/50 rounded-lg p-4 shadow-lg backdrop-blur-sm border border-gray-700 overflow-y-auto">
            <DataDisplay event={selectedEvent} region={selectedRegion} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
