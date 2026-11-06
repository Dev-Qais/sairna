import {create} from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
     (set) => ({
    isAuthenticated: false,
    isAuthLoading: false,
    user: null,
    setUser: (userData) => set({ user: userData, isAuthenticated: true, isAuthLoading: false }),
  })
)
)

   