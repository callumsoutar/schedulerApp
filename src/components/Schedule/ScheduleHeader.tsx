import React from 'react';
import { Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import BookingModal from '../Booking/BookingModal';
import { useBookingStore } from '../../store/useBookingStore';
import { formatDate } from '../../utils/dateUtils';

const ScheduleHeader: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { selectedDate, setSelectedDate, fetchBookings } = useBookingStore();

  const handlePreviousDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(new Date(e.target.value));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Flight Schedule</h1>
          <div className="flex items-center bg-white rounded-lg shadow-sm border">
            <button
              onClick={handlePreviousDay}
              className="p-2 hover:bg-gray-50 rounded-l-lg transition-colors border-r"
              aria-label="Previous day"
            >
              <ChevronLeft className="h-4 w-4 text-gray-600" />
            </button>
            
            <div className="relative px-4 py-1.5">
              <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              />
              <span className="text-sm font-medium text-gray-900">
                {formatDate(selectedDate)}
              </span>
            </div>

            <button
              onClick={handleNextDay}
              className="p-2 hover:bg-gray-50 rounded-r-lg transition-colors border-l"
              aria-label="Next day"
            >
              <ChevronRight className="h-4 w-4 text-gray-600" />
            </button>
          </div>
        </div>
        
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-5 w-5" />
          New Booking
        </button>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ScheduleHeader;