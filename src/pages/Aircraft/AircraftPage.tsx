import React from 'react';
import AircraftList from './AircraftList';
import AircraftDetails from './AircraftDetails';
import AircraftInitForm from './AircraftInitForm';

const AircraftPage = () => {
  const [selectedAircraftId, setSelectedAircraftId] = React.useState<
    string | null
  >(null);
  const [isAddingNew, setIsAddingNew] = React.useState(false);

  const handleNewClick = () => {
    setSelectedAircraftId(null);
    setIsAddingNew(true);
  };

  const handleAircraftSelect = (id: string) => {
    setIsAddingNew(false);
    setSelectedAircraftId(id);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-80 border-r bg-white">
        <AircraftList
          selectedId={selectedAircraftId}
          onSelect={handleAircraftSelect}
          onNew={handleNewClick}
        />
      </div>
      <div className="flex-1 overflow-auto">
        {isAddingNew ? (
          <div className="p-6">
            <AircraftInitForm
              onSuccess={() => {
                setIsAddingNew(false);
              }}
              onCancel={() => setIsAddingNew(false)}
            />
          </div>
        ) : selectedAircraftId ? (
          <AircraftDetails id={selectedAircraftId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select an aircraft to view details or click "Add Aircraft" to create
            a new one
          </div>
        )}
      </div>
    </div>
  );
};

export default AircraftPage;
