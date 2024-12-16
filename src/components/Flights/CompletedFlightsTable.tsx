import React, { useEffect } from 'react';
import { useBookingStore } from '../../store/useBookingStore';
import { useResourceStore } from '../../store/useResourceStore';
import { useMemberStore } from '../../store/useMemberStore';
import { formatDate, formatTime } from '../../utils/dateUtils';
import { Plane, User, Clock } from 'lucide-react';

const CompletedFlightsTable: React.FC = () => {
  const { bookings, fetchBookings } = useBookingStore();
  const { staff, aircraft, fetchResources } = useResourceStore();
  const { members, fetchMembers } = useMemberStore();

  useEffect(() => {
    fetchBookings();
    fetchResources();
    fetchMembers();
  }, [fetchBookings, fetchResources, fetchMembers]);

  // Filter completed flights
  const completedFlights = bookings.filter(booking => booking.status === 'complete');
  console.log('Completed flights:', completedFlights); // Debug log

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

  const getAircraftInfo = (aircraftId?: string) => {
    if (!aircraftId) return 'No Aircraft';
    const plane = aircraft.find(a => a.id === aircraftId);
    return plane ? `${plane.type} - ${plane.registration}` : 'Unknown Aircraft';
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Completed Flights</h2>
      </div>
      
      {completedFlights.length === 0 ? (
        <div className="p-6 text-center text-gray-500">
          No completed flights found
        </div>
      ) : (
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
                  Aircraft
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
                      <Plane className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">
                        {getAircraftInfo(flight.aircraftId)}
                      </span>
                    </div>
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
      )}
    </div>
  );
};

export default CompletedFlightsTable;