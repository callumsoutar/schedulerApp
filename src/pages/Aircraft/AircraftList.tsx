import React, { useEffect } from 'react';
import { Plus, Plane } from 'lucide-react';
import { useAircraftStore } from '../../store/useAircraftStore';

interface AircraftListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
}

const AircraftList: React.FC<AircraftListProps> = ({
  selectedId,
  onSelect,
  onNew,
}) => {
  const { aircraft, isLoading, fetchAircraft } = useAircraftStore();

  useEffect(() => {
    fetchAircraft();
  }, [fetchAircraft]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <button
          onClick={onNew}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Aircraft
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {aircraft.map((aircraft) => (
          <button
            key={aircraft.id}
            onClick={() => onSelect(aircraft.id)}
            className={`w-full p-4 text-left hover:bg-gray-50 flex items-center gap-3 ${
              selectedId === aircraft.id
                ? 'bg-blue-50 border-l-4 border-blue-600'
                : ''
            }`}
          >
            <Plane
              className={`h-5 w-5 ${
                selectedId === aircraft.id ? 'text-blue-600' : 'text-gray-400'
              }`}
            />
            <div>
              <div className="font-medium">{aircraft.registration}</div>
              <div className="text-sm text-gray-500">{aircraft.type}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AircraftList;
