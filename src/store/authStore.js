import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist((set) => ({
    isAuthenticated: true,
    isAuthLoading: false,
    user: null,
    setUser: (userData) =>
      set({ user: userData, isAuthenticated: true, isAuthLoading: false }),
    name: "auth-storage", // unique name for the storage
  })),
);
