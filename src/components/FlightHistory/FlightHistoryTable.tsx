```tsx
import React from 'react';
import { formatDate, formatTime } from '../../utils/dateUtils';
import { Plane, User, Clock, Calendar } from 'lucide-react';
import { useResourceStore } from '../../store/useResourceStore';
import { useMemberStore } from '../../store/useMemberStore';
import type { Booking } from '../../types';

interface FlightHistoryTableProps {
  bookings: Booking[];
  showMember?: boolean;
  showAircraft?: boolean;
}

const FlightHistoryTable: React.FC<FlightHistoryTableProps> = ({ 
  bookings,
  showMember = true,
  showAircraft = true,
}) => {
  const { staff, aircraft } = useResourceStore();
  const { members } = useMemberStore();

  const getInstructorName = (instructorId?: string) => {
    if (!instructorId) return 'No Instructor';
    const instructor = staff.find(s => s.id === instructorId);
    return instructor ? instructor.name : 'No Instructor';
  };

  const getMemberName = (memberId?: string) => {
    if (!memberId) return 'Unnamed';
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'Unnamed';
  };

  const getAircraftInfo = (aircraftId?: string) => {
    if (!aircraftId) return 'No Aircraft';
    const plane = aircraft.find(a => a.id === aircraftId);
    return plane ? `${plane.type} - ${plane.registration}` : 'No Aircraft';
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No flight history available
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">Date</th>
            {showMember && (
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Member</th>
            )}
            {showAircraft && (
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Aircraft</th>
            )}
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Instructor</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Time</th>
            <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-900">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {formatDate(booking.startDate)}
                </div>
              </td>
              {showMember && (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-400" />
                    {getMemberName(booking.memberId)}
                  </div>
                </td>
              )}
              {showAircraft && (
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                  <div className="flex items-center gap-2">
                    <Plane className="h-4 w-4 text-gray-400" />
                    {getAircraftInfo(booking.aircraftId)}
                  </div>
                </td>
              )}
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  {getInstructorName(booking.instructorId)}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {formatTime(booking.startDate)}
                </div>
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                {booking.flightType || 'Not specified'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightHistoryTable;
```