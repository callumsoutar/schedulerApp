import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { AircraftDefect } from '../types';

interface DefectStore {
  defects: AircraftDefect[];
  isLoading: boolean;
  error: string | null;
  fetchDefects: () => Promise<void>;
  fetchDefectsForAircraft: (aircraftId: string) => Promise<void>;
}

export const useDefectStore = create<DefectStore>((set) => ({
  defects: [],
  isLoading: false,
  error: null,

  fetchDefects: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('aircraft_defects')
        .select('*')
        .order('reported_date', { ascending: false });

      if (error) throw error;

      set({
        defects: data || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching defects:', error);
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  fetchDefectsForAircraft: async (aircraftId: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('aircraft_defects')
        .select('*')
        .eq('aircraft_id', aircraftId)
        .order('reported_date', { ascending: false });

      if (error) throw error;

      set({
        defects: data || [],
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching aircraft defects:', error);
      set({
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
}));