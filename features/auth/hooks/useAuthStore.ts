import { create } from 'zustand';
import type { User } from 'firebase/auth'; // 1. Import the User type

interface AuthState {
  user: User | null;
  initializing: boolean;
  setUser: (_user: User | null) => void;
  setInitializing: (_initializing: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  /**
   * The Firebase user object, or null if logged out.
   */
  user: null,
  /**
   * True while Firebase is checking AsyncStorage for a saved session.
   */
  initializing: true,

  /**
   * Action to set the current user.
   */
  setUser: (user) => set({ user }),

  /**
   * Action to set the initialization status.
   */
  setInitializing: (initializing) => set({ initializing }),
}));
