import React, { useEffect } from 'react';
import { useBookingStore } from '../../store/useBookingStore';
import { useResourceStore } from '../../store/useResourceStore';
import { useMemberStore } from '../../store/useMemberStore';
import { formatDate, formatTime } from '../../utils/dateUtils';
import { User, Clock } from 'lucide-react';

interface AircraftFlightHistoryProps {
  aircraftId: string;
}

const AircraftFlightHistory: React.FC<AircraftFlightHistoryProps> = ({ aircraftId }) => {
  const { bookings, fetchBookings } = useBookingStore();
  const { staff } = useResourceStore();
  const { members } = useMemberStore();

  useEffect(() => {
    console.log('Fetching bookings for aircraft:', aircraftId);
    fetchBookings();
  }, [aircraftId, fetchBookings]);

  // Filter completed flights for this aircraft
  const completedFlights = bookings.filter(
    booking => booking.aircraftId === aircraftId && booking.status === 'complete'
  );

  console.log('Completed flights:', completedFlights);

  const getInstructorName = (instructorId?: string) => {
    if (!instructorId) return 'No Instructor';
    const instructor = staff.find(s => s.id === instructorId);
    return instructor ? instructor.name : 'Unknown Instructor';
  };

  const getMemberName = (memberId?: string) => {
    if (!memberId) return 'No Member';
    const member = members.find(m => m.id === memberId);
    return member ? member.name : 'Unknown Member';
  };

  if (completedFlights.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No flight history available for this aircraft
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Member
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Instructor
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {completedFlights.map((flight) => (
            <tr key={flight.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatDate(flight.startDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatTime(flight.startDate)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">
                    {getMemberName(flight.memberId)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <User className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-900">
                    {getInstructorName(flight.instructorId)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {flight.flightType || 'Not specified'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AircraftFlightHistory;