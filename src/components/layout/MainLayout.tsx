"use client";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useUIStore } from "@/store/useUIStore";
import { useEffect } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { darkMode } = useUIStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="flex h-screen bg-[#e8edf5] dark:bg-[#0f1629] overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-5">{children}</main>
      </div>
    </div>
  );
}