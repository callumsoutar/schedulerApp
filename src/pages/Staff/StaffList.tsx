import React, { useEffect } from 'react';
import { Plus, Users } from 'lucide-react';
import { useStaffStore } from '../../store/useStaffStore';

interface StaffListProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const StaffList: React.FC<StaffListProps> = ({ selectedId, onSelect }) => {
  const { staff, isLoading, fetchStaff } = useStaffStore();

  useEffect(() => {
    fetchStaff();
  }, [fetchStaff]);

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
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors">
          <Plus className="h-4 w-4" />
          Add Staff Member
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {staff.map((member) => (
          <button
            key={member.id}
            onClick={() => onSelect(member.id)}
            className={`w-full p-4 text-left hover:bg-gray-50 flex items-center gap-3 ${
              selectedId === member.id
                ? 'bg-blue-50 border-l-4 border-blue-600'
                : ''
            }`}
          >
            <Users
              className={`h-5 w-5 ${
                selectedId === member.id ? 'text-blue-600' : 'text-gray-400'
              }`}
            />
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-gray-500">
                {member.role || 'Staff Member'}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StaffList;
