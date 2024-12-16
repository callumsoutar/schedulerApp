import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Staff } from '../types';

interface StaffStore {
  staff: Staff[];
  isLoading: boolean;
  error: string | null;
  fetchStaff: () => Promise<void>;
  getStaff: (id: string) => Staff | undefined;
  createStaff: (staff: Omit<Staff, 'id'>) => Promise<void>;
  updateStaff: (id: string, staff: Partial<Staff>) => Promise<void>;
}

export const useStaffStore = create<StaffStore>((set, get) => ({
  staff: [],
  isLoading: false,
  error: null,

  fetchStaff: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      set({
        staff: data || [],
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  getStaff: (id: string) => {
    return get().staff.find((s) => s.id === id);
  },

  createStaff: async (staff) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.from('staff').insert([staff]);

      if (error) throw error;

      await get().fetchStaff();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  updateStaff: async (id, staff) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.from('staff').update(staff).eq('id', id);

      if (error) throw error;

      await get().fetchStaff();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
}));
