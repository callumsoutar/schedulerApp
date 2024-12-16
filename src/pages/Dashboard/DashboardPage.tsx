import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/useBookingStore';
import { useResourceStore } from '../../store/useResourceStore';
import { useMemberStore } from '../../store/useMemberStore';
import { useDefectStore } from '../../store/useDefectStore';
import { formatDate, formatTime } from '../../utils/dateUtils';
import DefectsTable from '../../components/Defects/DefectsTable';
import {
  Plane,
  User,
  Clock,
  ArrowRight,
  CheckCircle,
  Calendar,
} from 'lucide-react';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { bookings, fetchBookings } = useBookingStore();
  const { aircraft, fetchResources } = useResourceStore();
  const { members, fetchMembers } = useMemberStore();
  const { fetchDefects } = useDefectStore();

  useEffect(() => {
    fetchBookings();
    fetchResources();
    fetchMembers();
    fetchDefects();
  }, [fetchBookings, fetchResources, fetchMembers, fetchDefects]);

  const currentFlights = bookings.filter((b) => b.status === 'checked-out');
  const requestedBookings = bookings.filter((b) => b.status === 'unconfirmed');

  const getMemberName = (memberId?: string) => {
    if (!memberId) return 'Unnamed';
    const member = members.find((m) => m.id === memberId);
    return member ? member.name : 'Unnamed';
  };

  const getAircraftInfo = (aircraftId?: string) => {
    if (!aircraftId) return 'No Aircraft';
    const plane = aircraft.find((a) => a.id === aircraftId);
    return plane ? `${plane.type} - ${plane.registration}` : 'No Aircraft';
  };

  return (
    <div className="p-6 space-y-8">
      {/* Current Flights */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Current Flights</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {currentFlights.length === 0 ? (
            <div className="p-6 text-gray-500 text-center">
              No flights currently in progress
            </div>
          ) : (
            <div className="divide-y">
              {currentFlights.map((flight) => (
                <div key={flight.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-gray-400" />
                          <span className="font-medium">
                            {getMemberName(flight.memberId)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Plane className="h-5 w-5 text-gray-400" />
                          <span>{getAircraftInfo(flight.aircraftId)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(flight.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(flight.startDate)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/flights/checkin/${flight.id}`)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Check In
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Requested Bookings */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Requested Bookings
        </h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {requestedBookings.length === 0 ? (
            <div className="p-6 text-gray-500 text-center">
              No pending booking requests
            </div>
          ) : (
            <div className="divide-y">
              {requestedBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <User className="h-5 w-5 text-gray-400" />
                          <span className="font-medium">
                            {getMemberName(booking.memberId)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Plane className="h-5 w-5 text-gray-400" />
                          <span>{getAircraftInfo(booking.aircraftId)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(booking.startDate)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>{formatTime(booking.startDate)}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Aircraft Defects */}
      <DefectsTable />
    </div>
  );
};

export default DashboardPage;