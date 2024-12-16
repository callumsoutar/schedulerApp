```tsx
import React from 'react';
import { useBookingStore } from '../../store/useBookingStore';
import FlightHistoryTable from '../FlightHistory/FlightHistoryTable';

interface MemberFlightHistoryProps {
  memberId: string;
}

const MemberFlightHistory: React.FC<MemberFlightHistoryProps> = ({ memberId }) => {
  const { bookings } = useBookingStore();
  
  // Get completed flights for this member
  const completedFlights = bookings.filter(
    booking => booking.memberId === memberId && booking.status === 'complete'
  );

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Flight History</h3>
      <FlightHistoryTable bookings={completedFlights} showMember={false} />
    </div>
  );
};

export default MemberFlightHistory;
```