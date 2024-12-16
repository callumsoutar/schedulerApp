import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, Plane, Users, MessageSquare, CheckCircle, Edit2, X } from 'lucide-react';
import Modal from '../common/Modal';
import { useResourceStore } from '../../store/useResourceStore';
import { useMemberStore } from '../../store/useMemberStore';
import { formatDate, formatTime } from '../../utils/dateUtils';
import type { Booking } from '../../types';

interface ViewBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: Booking;
  onEdit: () => void;
  onStatusChange: (status: 'confirmed' | 'complete' | 'canceled') => void;
}

const ViewBookingModal: React.FC<ViewBookingModalProps> = ({
  isOpen,
  onClose,
  booking,
  onEdit,
  onStatusChange,
}) => {
  const navigate = useNavigate();
  const { staff, aircraft } = useResourceStore();
  const { members } = useMemberStore();

  const instructor = staff.find(s => s.id === booking.instructorId);
  const plane = aircraft.find(a => a.id === booking.aircraftId);
  const member = booking.memberId ? members.find(m => m.id === booking.memberId) : null;

  const handleEdit = () => {
    navigate(`/bookings/${booking.id}/edit`);
    onClose();
  };

  const handleStatusChange = (status: 'confirmed' | 'complete' | 'canceled') => {
    onStatusChange(status);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking Details">
      <div className="p-6 space-y-6">
        {/* Time and Date */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">Start</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{formatDate(booking.startDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{formatTime(booking.startDate)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-500">End</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{formatDate(booking.endDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{formatTime(booking.endDate)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="grid grid-cols-2 gap-6">
          {instructor && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Instructor</div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{instructor.name}</span>
              </div>
            </div>
          )}
          {plane && (
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500">Aircraft</div>
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
      <div className="border-t p-6 flex justify-between">
        <div className="flex gap-3">
          {booking.status === 'confirmed' && (
            <button 
              onClick={() => navigate(`/flights/checkout/${booking.id}`)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              Check Out Flight
            </button>
          )}
          {booking.status === 'unconfirmed' && (
            <button 
              onClick={() => handleStatusChange('confirmed')}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              Confirm Booking
            </button>
          )}
          {(booking.status === 'unconfirmed' || booking.status === 'confirmed') && (
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
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            Edit Booking
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ViewBookingModal;