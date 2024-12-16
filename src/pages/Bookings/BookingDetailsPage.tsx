import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/useBookingStore';
import { useResourceStore } from '../../store/useResourceStore';
import { formatDate, formatTime } from '../../utils/dateUtils';
import {
  Calendar,
  Clock,
  User,
  Plane,
  MessageSquare,
  Wrench,
  Check,
  X,
} from 'lucide-react';
import BookingForm from '../../components/Booking/BookingForm';

const BookingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookings, fetchBookings, updateBooking } = useBookingStore();
  const { staff, aircraft, fetchResources } = useResourceStore();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchBookings();
    fetchResources();
  }, [fetchBookings, fetchResources]);

  const booking = bookings.find((b) => b.id === id);
  const instructor = staff.find((s) => s.id === booking?.instructorId);
  const plane = aircraft.find((a) => a.id === booking?.aircraftId);

  if (!booking) return null;

  const handleUpdateBooking = async (formData: {
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    instructorId: string;
    memberId: string;
    aircraftId: string;
    maintenance: boolean;
    comments: string;
  }) => {
    if (!id) return;

    try {
      await updateBooking(id, {
        ...formData,
        status: booking.status, // Preserve existing status unless explicitly changed
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const handleStatusChange = async (
    newStatus: 'confirmed' | 'complete' | 'canceled'
  ) => {
    if (!id) return;

    try {
      await updateBooking(id, {
        ...booking,
        status: newStatus,
      });
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  if (isEditing) {
    // Format dates for the form
    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);

    const formatTimeForInput = (date: Date) => {
      return date.toTimeString().slice(0, 5); // Get HH:MM format
    };

    const initialData = {
      startDate: startDate.toISOString().split('T')[0],
      startTime: formatTimeForInput(startDate),
      endDate: endDate.toISOString().split('T')[0],
      endTime: formatTimeForInput(endDate),
      instructorId: booking.instructorId || '',
      memberId: booking.memberId || '',
      aircraftId: booking.aircraftId || '',
      maintenance: booking.maintenance,
      comments: booking.comments || '',
    };

    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold text-gray-900">Edit Booking</h2>
          </div>
          <BookingForm
            initialData={initialData}
            onSubmit={handleUpdateBooking}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {booking.maintenance ? 'Maintenance Booking' : 'Flight Booking'}
              </h1>
              <p className="text-gray-500 mt-1">Booking ID: {booking.id}</p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                booking.status === 'confirmed'
                  ? 'bg-green-100 text-green-800'
                  : booking.status === 'unconfirmed'
                  ? 'bg-yellow-100 text-yellow-800'
                  : booking.status === 'complete'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Date and Time */}
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

          {/* Maintenance Flag */}
          {booking.maintenance && (
            <div className="flex items-center gap-2 p-3 bg-orange-50 text-orange-700 rounded-lg">
              <Wrench className="h-5 w-5" />
              <span className="font-medium">This is a maintenance booking</span>
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
        <div className="border-t p-6 flex justify-between">
          <div className="flex gap-3">
            {booking.status === 'unconfirmed' && (
              <button
                onClick={() => handleStatusChange('confirmed')}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Check className="h-4 w-4" />
                Confirm Booking
              </button>
            )}
            {booking.status === 'confirmed' && (
              <button
                onClick={() => handleStatusChange('complete')}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Check className="h-4 w-4" />
                Mark as Complete
              </button>
            )}
            {(booking.status === 'unconfirmed' ||
              booking.status === 'confirmed') && (
              <button
                onClick={() => handleStatusChange('canceled')}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <X className="h-4 w-4" />
                Cancel Booking
              </button>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Edit Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
