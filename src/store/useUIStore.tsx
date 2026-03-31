"use client";
import { create } from "zustand";

type UIState = {
  collapsed: boolean;
  toggleSidebar: () => void;
  darkMode: boolean;
  toggleTheme: () => void;
  isNotificationOpen: boolean;
  setNotificationOpen: (open: boolean) => void;
  isProfileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  collapsed: false,
  toggleSidebar: () => set((s) => ({ collapsed: !s.collapsed })),
  darkMode: false,
  toggleTheme: () =>
    set((s) => {
      const next = !s.darkMode;
      document.documentElement.classList.toggle("dark", next);
      return { darkMode: next };
    }),
  isNotificationOpen: false,
  setNotificationOpen: (open) => set({ isNotificationOpen: open }),
  isProfileOpen: false,
  setProfileOpen: (open) => set({ isProfileOpen: open }),
}));