import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkPermission: (permission: string) => boolean;
}

// Default admin user with all permissions
const defaultAdminUser: User = {
  id: 'default-admin',
  email: 'admin@example.com',
  roles: ['admin'],
  permissions: [
    'booking.create',
    'booking.confirm',
    'booking.view',
    'booking.edit',
    'booking.delete',
  ],
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initialize with default admin user
  user: defaultAdminUser,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) throw authError;

      // Fetch user roles and permissions
      const { data: userData, error: userError } = await supabase
        .from('members')
        .select(
          `
          id,
          email,
          user_roles (
            role
          ),
          role_permissions!inner (
            permissions (
              name
            )
          )
        `
        )
        .eq('auth_id', authData.user.id)
        .single();

      if (userError) throw userError;

      set({
        user: {
          id: userData.id,
          email: userData.email,
          roles: userData.user_roles.map((ur: { role: string }) => ur.role),
          permissions: userData.role_permissions.map(
            (rp: { permissions: { name: string }[] }) => rp.permissions[0].name
          ),
        },
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

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Reset to default admin user instead of null
      set({ user: defaultAdminUser, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
        isLoading: false,
      });
    }
  },

  checkPermission: (permission: string) => {
    const { user } = get();
    return user?.permissions.includes(permission) || false;
  },
}));
