import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Booking, BookingStatus } from '../types';

interface BookingStore {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  fetchBookings: () => Promise<void>;
  createBooking: (booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  updateBooking: (id: string, booking: Partial<Booking>) => Promise<void>;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],
  isLoading: false,
  error: null,
  selectedDate: new Date(),

  setSelectedDate: (date: Date) => {
    set({ selectedDate: date });
    get().fetchBookings();
  },

  fetchBookings: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('start_date', { ascending: true });

      if (error) throw error;

      set({
        bookings: data.map(booking => ({
          id: booking.id,
          startDate: booking.start_date,
          endDate: booking.end_date,
          instructorId: booking.instructor_id || undefined,
          memberId: booking.member_id || undefined,
          aircraftId: booking.aircraft_id || undefined,
          status: booking.status as BookingStatus,
          maintenance: booking.maintenance,
          comments: booking.comments || '',
          flightType: booking.flight_type || undefined,
          created_at: booking.created_at,
          updated_at: booking.updated_at
        })),
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
        bookings: [],
      });
    }
  },

  createBooking: async (booking) => {
    set({ isLoading: true });
    try {
      const { error } = await supabase.from('bookings').insert([{
        start_date: booking.startDate,
        end_date: booking.endDate,
        instructor_id: booking.instructorId,
        member_id: booking.memberId,
        aircraft_id: booking.aircraftId,
        status: booking.status,
        maintenance: booking.maintenance,
        comments: booking.comments,
        flight_type: booking.flightType
      }]);

      if (error) throw error;

      await get().fetchBookings();
    } catch (error) {
      console.error('Error creating booking:', error);
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false 
      });
    }
  },

  updateBooking: async (id, booking) => {
    set({ isLoading: true });
    try {
      const updateData: Record<string, any> = {};
      
      if (booking.startDate !== undefined) updateData.start_date = booking.startDate;
      if (booking.endDate !== undefined) updateData.end_date = booking.endDate;
      if (booking.instructorId !== undefined) updateData.instructor_id = booking.instructorId;
      if (booking.memberId !== undefined) updateData.member_id = booking.memberId;
      if (booking.aircraftId !== undefined) updateData.aircraft_id = booking.aircraftId;
      if (booking.status !== undefined) updateData.status = booking.status;
      if (booking.maintenance !== undefined) updateData.maintenance = booking.maintenance;
      if (booking.comments !== undefined) updateData.comments = booking.comments;
      if (booking.flightType !== undefined) updateData.flight_type = booking.flightType;

      const { error } = await supabase
        .from('bookings')
        .update(updateData)
        .eq('id', id);

      if (error) throw error;

      await get().fetchBookings();
      set({ isLoading: false });
    } catch (error) {
      console.error('Error updating booking:', error);
      set({ 
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false 
      });
    }
  },
}));