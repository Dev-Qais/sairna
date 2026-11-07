import { create } from "zustand";
// import { persist } from "zustand/middleware";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  isAuthLoading: false,
  user: null,
  setUser: (userData) =>
    set({ user: userData, isAuthenticated: true, isAuthLoading: false }),
  name: "auth-storage",
}));
