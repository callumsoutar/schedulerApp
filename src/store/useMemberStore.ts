import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Member } from '../types';

interface MemberStore {
  members: Member[];
  isLoading: boolean;
  error: string | null;
  fetchMembers: () => Promise<void>;
  getMember: (id: string) => Member | undefined;
  createMember: (member: Omit<Member, 'id'>) => Promise<void>;
  updateMember: (id: string, member: Partial<Member>) => Promise<void>;
}

export const useMemberStore = create<MemberStore>((set, get) => ({
  members: [],
  isLoading: false,
  error: null,

  fetchMembers: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw error;

      set({
        members: data || [],
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

  getMember: (id: string) => {
    return get().members.find((m) => m.id === id);
  },

  createMember: async (member) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.from('members').insert([member]);

      if (error) throw error;

      await get().fetchMembers();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  updateMember: async (id, member) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase
        .from('members')
        .update(member)
        .eq('id', id);

      if (error) throw error;

      await get().fetchMembers();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },
}));
