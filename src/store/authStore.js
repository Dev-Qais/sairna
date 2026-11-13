import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      isAuthLoading: true,
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
      setUser: (user) =>
        set({ user, isAuthenticated: !!user, isAuthLoading: false }),
    }),

    {
      name: "auth-storage",

      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        tokenType: state.tokenType,
      }),
    },
  ),
);
