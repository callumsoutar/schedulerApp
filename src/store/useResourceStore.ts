import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Aircraft, Staff } from '../types';

interface ResourceStore {
  staff: Staff[];
  aircraft: Aircraft[];
  isLoading: boolean;
  error: string | null;
  fetchResources: () => Promise<void>;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  staff: [],
  aircraft: [],
  isLoading: false,
  error: null,
  fetchResources: async () => {
    set({ isLoading: true, error: null });
    try {
      // Fetch both resources in parallel
      const [aircraftResponse, staffResponse] = await Promise.all([
        supabase
          .from('aircraft')
          .select('*')
          .order('type', { ascending: true }),

        supabase.from('staff').select('*').order('name', { ascending: true }),
      ]);

      // Handle errors if any
      if (aircraftResponse.error) {
        throw new Error(
          `Aircraft fetch error: ${aircraftResponse.error.message}`
        );
      }
      if (staffResponse.error) {
        throw new Error(`Staff fetch error: ${staffResponse.error.message}`);
      }

      set({
        aircraft: aircraftResponse.data || [],
        staff: staffResponse.data || [],
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An unknown error occurred';
      console.error('Resource fetch error:', errorMessage);
      set({
        error: errorMessage,
        isLoading: false,
        staff: [],
        aircraft: [],
      });
    }
  },
}));
