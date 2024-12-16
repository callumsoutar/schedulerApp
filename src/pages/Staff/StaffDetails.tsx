import React from 'react';
import { useStaffStore } from '../../store/useStaffStore';
import { Mail, Phone, Award } from 'lucide-react';

interface StaffDetailsProps {
  id: string;
}

const StaffDetails: React.FC<StaffDetailsProps> = ({ id }) => {
  const { getStaff } = useStaffStore();
  const staff = getStaff(id);

  if (!staff) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {staff.name}
          </h1>
          <p className="text-gray-500">{staff.role || 'Staff Member'}</p>
        </div>

        <div className="border-t px-6 py-4 grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">
              Contact Information
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4 text-gray-400" />
                {staff.email}
              </div>
              {staff.phone && (
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="h-4 w-4 text-gray-400" />
                  {staff.phone}
                </div>
              )}
            </div>
          </div>

          <div>
            <div className="text-sm font-medium text-gray-500 mb-2">Status</div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  staff.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`}
              ></span>
              <span className="capitalize">{staff.status}</span>
            </div>
          </div>
        </div>

        {staff.qualifications && staff.qualifications.length > 0 && (
          <div className="border-t px-6 py-4">
            <div className="text-sm font-medium text-gray-500 mb-2">
              Qualifications
            </div>
            <div className="flex flex-wrap gap-2">
              {staff.qualifications.map((qual, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm flex items-center gap-1"
                >
                  <Award className="h-4 w-4" />
                  {qual}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="border-t px-6 py-4 flex justify-end gap-3">
          <button className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            View Schedule
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Edit Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffDetails;
