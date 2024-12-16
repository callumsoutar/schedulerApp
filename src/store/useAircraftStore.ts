import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Aircraft } from '../types';

interface AircraftStore {
  aircraft: Aircraft[];
  isLoading: boolean;
  error: string | null;
  fetchAircraft: () => Promise<void>;
  getAircraft: (id: string) => Aircraft | undefined;
  createAircraft: (
    aircraft: Omit<Aircraft, 'id' | 'created_at' | 'updated_at'>
  ) => Promise<void>;
  updateAircraft: (id: string, aircraft: Partial<Aircraft>) => Promise<void>;
}

export const useAircraftStore = create<AircraftStore>((set, get) => ({
  aircraft: [],
  isLoading: false,
  error: null,

  fetchAircraft: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('aircraft')
        .select('*')
        .order('type', { ascending: true });

      if (error) throw error;

      set({
        aircraft: data || [],
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

  getAircraft: (id: string) => {
    return get().aircraft.find((a) => a.id === id);
  },

  createAircraft: async (aircraft) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.from('aircraft').insert([
        {
          ...aircraft,
          status: aircraft.status || 'active',
        },
      ]);

      if (error) throw error;

      await get().fetchAircraft();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  updateAircraft: async (id, aircraft) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('aircraft')
        .update(aircraft)
        .eq('id', id);

      if (error) throw error;

      await get().fetchAircraft();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
}));
