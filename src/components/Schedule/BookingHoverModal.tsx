import React from 'react';
import { Plane, User, Users, MessageSquare } from 'lucide-react';
import type { Booking } from '../../types';
import { useResourceStore } from '../../store/useResourceStore';
import { useMemberStore } from '../../store/useMemberStore';

interface BookingHoverModalProps {
  booking: Booking;
  position: { x: number; y: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const BookingHoverModal: React.FC<BookingHoverModalProps> = ({
  booking,
  position,
  onMouseEnter,
  onMouseLeave,
}) => {
  const { staff, aircraft } = useResourceStore();
  const { getMember } = useMemberStore();
  
  const instructor = staff.find(s => s.id === booking.instructorId);
  const plane = aircraft.find(a => a.id === booking.aircraftId);
  const member = booking.memberId ? getMember(booking.memberId) : null;

  // Calculate if modal should appear above or below the booking
  const isTopHalf = position.y < window.innerHeight / 2;
  
  return (
    <div
      className="fixed z-50 w-72"
      style={{
        left: `${position.x}px`,
        top: isTopHalf ? `${position.y + 40}px` : 'auto',
        bottom: !isTopHalf ? `${window.innerHeight - position.y + 40}px` : 'auto',
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Arrow pointer */}
      <div 
        className="absolute left-4 w-3 h-3 bg-navy-900 transform rotate-45"
        style={{
          top: isTopHalf ? '-6px' : 'auto',
          bottom: !isTopHalf ? '-6px' : 'auto',
        }}
      />

      {/* Modal content */}
      <div className="bg-navy-900 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 space-y-3">
          {plane && (
            <div className="flex items-center gap-3 text-white">
              <Plane className="h-4 w-4 text-blue-300" />
              <span>{`${plane.type} - ${plane.registration}`}</span>
            </div>
          )}
          
          {instructor && (
            <div className="flex items-center gap-3 text-white">
              <User className="h-4 w-4 text-blue-300" />
              <span>{instructor.name}</span>
            </div>
          )}

          {member && (
            <div className="flex items-center gap-3 text-white">
              <Users className="h-4 w-4 text-blue-300" />
              <span>{member.name}</span>
            </div>
          )}

          {booking.comments && (
            <div className="flex items-start gap-3 text-white">
              <MessageSquare className="h-4 w-4 text-blue-300 mt-1 flex-shrink-0" />
              <span className="text-sm">{booking.comments}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHoverModal;