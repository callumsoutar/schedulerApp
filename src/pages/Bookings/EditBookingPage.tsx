import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBookingStore } from '../../store/useBookingStore';
import BookingForm from '../../components/Booking/BookingForm';
import { ArrowLeft } from 'lucide-react';

const EditBookingPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { bookings, fetchBookings, updateBooking } = useBookingStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBookings().then(() => setIsLoading(false));
  }, [fetchBookings]);

  const booking = bookings.find(b => b.id === id);

  if (isLoading) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          Booking not found
        </div>
      </div>
    );
  }

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
    maintenance: booking.maintenance || false,
    comments: booking.comments || '',
    flightType: booking.flightType || '',
  };

  const handleSubmit = async (formData: any) => {
    try {
      await updateBooking(id!, {
        ...formData,
        status: booking.status, // Preserve existing status
      });
      navigate(`/bookings/${id}`);
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Edit Booking</h2>
          <p className="text-gray-500 mt-1">Update booking details</p>
        </div>
        <BookingForm
          initialData={initialData}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default EditBookingPage;