import { useParams, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/useBookingStore';
import { useResourceStore } from '../../store/useResourceStore';
import { useMemberStore } from '../../store/useMemberStore';
import { formatDate, formatTime } from '../../utils/dateUtils';
import {
  Plane,
  User,
  Users,
  Calendar,
  Clock,
  MessageSquare,
  CheckCircle,
} from 'lucide-react';

const CheckOutPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookings, updateBooking } = useBookingStore();
  const { staff, aircraft } = useResourceStore();
  const { members } = useMemberStore();

  const booking = bookings.find((b) => b.id === id);
  const instructor = booking?.instructorId
    ? staff.find((s) => s.id === booking.instructorId)
    : null;
  const plane = booking?.aircraftId
    ? aircraft.find((a) => a.id === booking.aircraftId)
    : null;
  const member = booking?.memberId
    ? members.find((m) => m.id === booking.memberId)
    : null;

  if (!booking) return null;

  const handleCheckOut = async () => {
    try {
      await updateBooking(booking.id, {
        ...booking,
        status: 'checked-out',
      });
      navigate('/schedule');
    } catch (error) {
      console.error('Error checking out flight:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-gray-900">Flight Check Out</h1>
          <p className="text-gray-500 mt-1">
            Review details and check out the flight
          </p>
        </div>

        <div className="p-6 space-y-8">
          {/* Time and Date */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Start</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">
                    {formatDate(booking.startDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">
                    {formatTime(booking.startDate)}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">End</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">
                    {formatDate(booking.endDate)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">
                    {formatTime(booking.endDate)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Resources */}
          <div className="grid grid-cols-2 gap-6">
            {instructor && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">
                  Instructor
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{instructor.name}</span>
                </div>
              </div>
            )}
            {plane && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500">
                  Aircraft
                </div>
                <div className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-900">{`${plane.type} - ${plane.registration}`}</span>
                </div>
              </div>
            )}
          </div>

          {/* Member */}
          {member && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Member</div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{member.name}</span>
              </div>
            </div>
          )}

          {/* Comments */}
          {booking.comments && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Comments</div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-400 mt-0.5" />
                  <p className="text-gray-700">{booking.comments}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="border-t p-6 flex justify-end gap-3">
          <button
            onClick={() => navigate('/schedule')}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCheckOut}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <CheckCircle className="h-5 w-5" />
            Check Out Flight
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOutPage;
