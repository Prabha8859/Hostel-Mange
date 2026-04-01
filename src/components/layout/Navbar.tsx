"use client";
import { useUIStore } from "../../store/useUIStore";
import { Sun, Moon, Bell, Search } from "lucide-react";
import { useState } from "react";
import RightDrawer from "../ui/RightDrawer";

export default function Navbar({ onSearch }: { onSearch?: (q: string) => void }) {
  const { 
    darkMode, 
    toggleTheme, 
    isNotificationOpen, 
    setNotificationOpen, 
    isProfileOpen, 
    setProfileOpen 
  } = useUIStore();
  const [q, setQ] = useState("");

  return (
    <header className="sticky top-0 z-10 h-[70px] px-6 flex items-center justify-between
      bg-white dark:bg-[#0d2030] border-b-2 border-c3">
      <div>
        <p className="text-[11px] text-gray-400 font-medium">👋 Welcome back, Admin</p>
        <h1 className="text-[17px] font-extrabold text-sidebar dark:text-white leading-tight">
          Dashboard Overview
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Search */}
        <div className={`flex items-center gap-1.5 px-4 py-2 bg-c1/50 dark:bg-white/5 border border-c3/40
          rounded-2xl transition-all duration-500 focus-within:border-c4 focus-within:bg-white focus-within:ring-4 focus-within:ring-c4/10
          focus-within:w-[240px] w-[200px]`}>
          <Search size={13} className="text-gray-400 shrink-0" />
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); onSearch?.(e.target.value); }}
            placeholder="Search student, room..."
            className="bg-transparent border-none outline-none text-[12px] text-sidebar
              placeholder:text-gray-400 w-full font-outfit"
          />
        </div>

        <button 
          onClick={() => setNotificationOpen(true)}
          className="group w-[42px] h-[42px] rounded-2xl bg-c1/50 dark:bg-white/5 border border-c3/40
          hover:bg-white hover:border-c4 hover:shadow-xl hover:shadow-c4/10 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center relative">
          <Bell size={16} className="text-sidebar transition-transform duration-500 group-hover:rotate-12" />
          <span className="absolute top-[5px] right-[5px] w-1.5 h-1.5 bg-red-500 rounded-full
            border-2 border-white animate-pulse" />
        </button>

        <button onClick={toggleTheme}
          className="group w-[42px] h-[42px] rounded-2xl bg-c1/50 dark:bg-white/5 border border-c3/40
            hover:bg-white hover:border-c4 hover:shadow-xl hover:shadow-c4/10 hover:-translate-y-1 transition-all duration-500 flex items-center justify-center">
          {darkMode ? <Sun size={16} className="text-sidebar transition-all duration-500 group-hover:rotate-90" /> : <Moon size={16} className="text-sidebar transition-all duration-500 group-hover:-rotate-12" />}
        </button>

        <div 
          onClick={() => setProfileOpen(true)}
          className="flex items-center gap-2 px-3 py-2 bg-c1/50 dark:bg-white/5 border border-c3/40
          rounded-2xl hover:border-c4 hover:bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer group">
          <div className="w-[28px] h-[28px] rounded-xl bg-c4 flex items-center justify-center
            text-sidebar text-[10px] font-extrabold">AD</div>
          <span className="text-[11px] font-bold text-sidebar dark:text-white">Admin User</span>
        </div>
      </div>

      {/* Notification Section */}
      <RightDrawer 
        isOpen={isNotificationOpen} 
        onClose={() => setNotificationOpen(false)} 
        title="Notifications"
      >
        <div className="space-y-4">
          <p className="text-[12px] text-gray-500">No new notifications</p>
        </div>
      </RightDrawer>

      {/* User Profile Section */}
      <RightDrawer 
        isOpen={isProfileOpen} 
        onClose={() => setProfileOpen(false)} 
        title="User Profile"
      >
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-16 h-16 rounded-full bg-c4 flex items-center justify-center text-sidebar text-xl font-bold mb-3">AD</div>
          <h4 className="font-bold text-sidebar dark:text-white">Admin User</h4>
          <p className="text-[12px] text-gray-400 mb-5">superadmin@hostelpro.com</p>
          <button className="w-full py-2 bg-red-50 text-red-500 border border-red-100 rounded-xl font-bold text-[12px] hover:bg-red-500 hover:text-white transition-all">
            Logout
          </button>
        </div>
      </RightDrawer>
    </header>
  );
}