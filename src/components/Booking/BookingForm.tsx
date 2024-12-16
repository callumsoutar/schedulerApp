import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Plane, MessageSquare } from 'lucide-react';
import { useResourceStore } from '../../store/useResourceStore';
import SearchableSelect from '../common/SearchableSelect';
import Select from '../common/Select';
import VoucherInput from './VoucherInput';
import type { BookingStatus, ResourceType } from '../../types';

interface BookingFormProps {
  initialData?: {
    startTime?: string;
    resourceId?: string;
    resourceType?: ResourceType;
    startDate?: string;
    endDate?: string;
    instructorId?: string;
    memberId?: string;
    aircraftId?: string;
    maintenance?: boolean;
    comments?: string;
    flightType?: string;
    voucherNumber?: string;
  };
  onSubmit: (data: any) => void;
  onCancel?: () => void;
}

const FLIGHT_TYPES = [
  { value: 'aeroclub_dual', label: 'Aeroclub Dual' },
  { value: 'aeroclub_solo', label: 'Aeroclub Solo' },
  { value: 'trial_flight', label: 'Trial Flight' },
];

const BookingForm: React.FC<BookingFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const { staff, aircraft } = useResourceStore();
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState({
    startDate: today,
    startTime: '09:00',
    endDate: today,
    endTime: '10:00',
    instructorId: '',
    memberId: '',
    aircraftId: '',
    status: 'unconfirmed' as BookingStatus,
    maintenance: false,
    comments: '',
    flightType: '',
    voucherNumber: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showVoucherInput, setShowVoucherInput] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  useEffect(() => {
    setShowVoucherInput(formData.flightType === 'trial_flight');
  }, [formData.flightType]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate dates and times
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    if (endDateTime <= startDateTime) {
      newErrors.endTime = 'End time must be after start time';
    }

    // Require at least one resource (instructor or aircraft)
    if (!formData.instructorId && !formData.aircraftId) {
      newErrors.resources = 'Please select at least an instructor or an aircraft';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent, confirm: boolean = false) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Combine date and time into ISO strings
    const startDateTime = new Date(`${formData.startDate}T${formData.startTime}`);
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    onSubmit({
      ...formData,
      startDate: startDateTime.toISOString(),
      endDate: endDateTime.toISOString(),
      status: confirm ? 'confirmed' : 'unconfirmed',
    });
  };

  const timeOptions = Array.from({ length: 96 }, (_, i) => {
    const hour = Math.floor(i / 4);
    const minute = (i % 4) * 15;
    return {
      value: `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
      label: new Date(2024, 0, 1, hour, minute).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    };
  });

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="p-6 space-y-6">
      {/* Date/Time Selection */}
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.startDate}
                  min={today}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Select
                label=""
                options={timeOptions}
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                className="!mt-0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  type="date"
                  className="w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
                  value={formData.endDate}
                  min={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  required
                />
                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <Select
                label=""
                options={timeOptions}
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                className="!mt-0"
              />
            </div>
            {errors.endTime && (
              <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
            )}
          </div>
        </div>

        {/* Resource Selection */}
        <div className="space-y-4">
          <Select
            label="Instructor"
            options={staff.map(s => ({ value: s.id, label: s.name }))}
            value={formData.instructorId}
            onChange={(e) => setFormData({ ...formData, instructorId: e.target.value })}
          />

          <Select
            label="Aircraft"
            options={aircraft.map(a => ({ value: a.id, label: `${a.type} - ${a.registration}` }))}
            value={formData.aircraftId}
            onChange={(e) => setFormData({ ...formData, aircraftId: e.target.value })}
          />

          <Select
            label="Flight Type"
            options={FLIGHT_TYPES}
            value={formData.flightType}
            onChange={(e) => setFormData({ ...formData, flightType: e.target.value })}
          />

          {errors.resources && (
            <p className="text-sm text-red-600">{errors.resources}</p>
          )}
        </div>
      </div>

      {/* Member Search */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Member</label>
        <div className="relative">
          <SearchableSelect
            value={formData.memberId}
            onChange={(value) => setFormData({ ...formData, memberId: value })}
            placeholder="Search for a member..."
          />
          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Voucher Input (only for trial flights) */}
      {showVoucherInput && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Voucher Number</label>
          <VoucherInput
            value={formData.voucherNumber}
            onChange={(value, isValid) => setFormData({ ...formData, voucherNumber: value })}
          />
        </div>
      )}

      {/* Comments */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Comments</label>
        <div className="relative">
          <textarea
            className="w-full rounded-lg border-gray-300 pl-10 focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            placeholder="Add any additional notes..."
          />
          <MessageSquare className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Save Booking
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
        >
          Save and Confirm
        </button>
      </div>
    </form>
  );
};

export default BookingForm;