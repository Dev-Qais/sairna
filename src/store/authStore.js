import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAuthLoading: false,
      user: null,
      accessToken: null,
      tokenType: "Bearer",

      setAuth: ({ user, accessToken, tokenType }) =>
        set({
          isAuthenticated: true,
          isAuthLoading: false,
          user,
          accessToken,
          tokenType,
        }),
      logout: () =>
        set({
          isAuthenticated: false,
          isAuthLoading: false,
          user: null,
          accessToken: null,
          tokenType: "Bearer",
        }),
      setAuthLoading: (isAuthLoading) => set({ isAuthLoading }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
