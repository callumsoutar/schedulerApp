import React from 'react';
import { useBookingStore } from '../../store/useBookingStore';
import BookingForm from './BookingForm';
import Modal from '../common/Modal';
import type { ResourceType } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    startTime: string;
    resourceId: string;
    resourceType: ResourceType;
  };
}

const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, initialData }) => {
  const { createBooking } = useBookingStore();

  const handleSubmit = async (formData: any) => {
    await createBooking(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Booking">
      <BookingForm initialData={initialData} onSubmit={handleSubmit} />
    </Modal>
  );
};

export default BookingModal;