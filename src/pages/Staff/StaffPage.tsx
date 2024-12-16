import React from 'react';
import StaffList from './StaffList';
import StaffDetails from './StaffDetails';

const StaffPage = () => {
  const [selectedStaffId, setSelectedStaffId] = React.useState<string | null>(
    null
  );

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <div className="w-80 border-r bg-white">
        <StaffList selectedId={selectedStaffId} onSelect={setSelectedStaffId} />
      </div>
      <div className="flex-1 overflow-auto">
        {selectedStaffId ? (
          <StaffDetails id={selectedStaffId} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select a staff member to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffPage;
