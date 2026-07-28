import { create } from "zustand";

interface LayoutState {
  collapsed: boolean;
  toggleSidebar: () => void;
  setCollapsed: (value: boolean) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  collapsed:
    localStorage.getItem("sidebar-collapsed") === "true",

  toggleSidebar: () =>
    set((state) => {
      const next = !state.collapsed;
      localStorage.setItem(
        "sidebar-collapsed",
        String(next)
      );
      return { collapsed: next };
    }),

  setCollapsed: (value) => {
    localStorage.setItem(
      "sidebar-collapsed",
      String(value)
    );
    set({ collapsed: value });
  },
}));