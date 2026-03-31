"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "@/store/useUIStore";
import {
  LayoutDashboard, Users, DoorOpen, CreditCard,
  MessageSquare, CalendarDays, BarChart3, Settings, User,
  ChevronLeft, ChevronRight, LogOut,
} from "lucide-react";

const navItems = [
  { label: "Dashboard",  href: "/dashboard",  icon: LayoutDashboard, badge: null },
  { label: "Students",   href: "/students",   icon: Users,           badge: "120" },
  { label: "Rooms",      href: "/rooms",       icon: DoorOpen,        badge: null },
  { label: "Payments",   href: "/payments",   icon: CreditCard,      badge: "15" },
  { label: "Complaints", href: "/complaints", icon: MessageSquare,   badge: "5" },
  { label: "Calendar",   href: "/calendar",   icon: CalendarDays,    badge: null },
  { label: "Reports",    href: "/reports",    icon: BarChart3,        badge: null },
  { label: "Settings",   href: "/settings",   icon: Settings,         badge: null },
];

export default function Sidebar() {
  const { collapsed, toggleSidebar } = useUIStore();
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Handle outside click for profile dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }

    if (profileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileOpen]);

  return (
    <aside className={`relative flex flex-col min-h-screen bg-sidebar text-white
      border-r border-white/5 transition-all duration-500 shrink-0 z-20 shadow-[10px_0_40px_rgba(0,0,0,0.4)]
      ${collapsed ? "w-[62px]" : "w-52"}`}>

      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-[18px] border-b border-white/5">
        <div className="w-[34px] h-[34px] rounded-[10px] bg-c4 flex items-center justify-center
          text-sidebar font-extrabold text-[13px] shrink-0 shadow-[0_0_15px_rgba(0,225,255,0.4)]">HP</div>
        {!collapsed && <span className="font-bold text-[15px] whitespace-nowrap">HostelPro</span>}
      </div>

      {/* Collapse Toggle */}
      <button onClick={toggleSidebar}
        className="w-full flex justify-end px-4 py-2 text-white/30 hover:text-c4 transition-colors">
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      <nav className="flex-1 px-2 pb-4 space-y-0.5">
        {!collapsed && (
          <p className="text-[9px] font-bold text-white/25 uppercase tracking-[1.5px] px-2 pt-2 pb-1">
            Main
          </p>
        )}

        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}
              className={`group flex items-center gap-2.5 px-3 py-[10px] rounded-xl
                transition-all duration-300 relative overflow-hidden
                ${active
                  ? "bg-gradient-to-r from-c4/20 to-transparent text-white shadow-[inset_0_0_20px_rgba(0,225,255,0.05)]"
                  : "text-white/40 hover:bg-white/5 hover:text-white hover:shadow-lg hover:shadow-black/20"
                }`}>
              {active && <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-c4 rounded-r-full shadow-[0_0_10px_#00E1FF]" />}
              
              <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0
                transition-all duration-200
                ${active ? "text-c4" : "bg-white/5 group-hover:bg-white/10 group-hover:scale-110"}`}>
                <Icon size={15} />
              </span>
              {!collapsed && (
                <span className={`text-[13px] flex-1 whitespace-nowrap transition-all ${active ? "font-bold" : "font-medium"}`}>{item.label}</span>
              )}
              {/* Tooltip for collapsed state */}
              {collapsed && (
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-sidebar/60 backdrop-blur-md border border-white/10 rounded-lg
                  opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 text-[11px] font-bold shadow-xl">
                  {item.label}
                </div>
              )}
              {!collapsed && item.badge && (
                <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-2 pb-4 space-y-1">
        {/* Logout Button */}
        <button 
          onClick={() => setShowLogoutModal(true)}
          className={`group flex items-center gap-2.5 px-3 py-[10px] rounded-xl w-full
            transition-all duration-300 relative overflow-hidden text-red-400 hover:bg-red-500/10 hover:text-red-300`}
        >
          <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 bg-red-500/5 group-hover:bg-red-500/20">
            <LogOut size={15} />
          </span>
          {!collapsed && <span className="text-[13px] font-medium flex-1 text-left">Logout</span>}
          {collapsed && (
            <div className="absolute left-full ml-4 px-3 py-1.5 bg-sidebar/60 backdrop-blur-md border border-white/10 rounded-lg
              opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 text-[11px] font-bold shadow-xl">
              Logout
            </div>
          )}
        </button>

        <div className="relative" ref={profileRef}>
          {/* Profile Dropdown Menu */}
          {profileOpen && !collapsed && (
            <div className="absolute bottom-full left-0 right-0 mb-2 mx-1 p-1.5 bg-[#0d2030] border border-white/10 
              rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <Link href="/profile" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-bold text-white/50 hover:bg-white/5 hover:text-white transition-all">
                <User size={14} /> Profile
              </Link>
              <Link href="/settings" 
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-[12px] font-bold text-white/50 hover:bg-white/5 hover:text-white transition-all">
                <Settings size={14} /> Settings
              </Link>
            </div>
          )}

          {!collapsed && (
            <div 
              onClick={() => setProfileOpen(!profileOpen)}
              className={`mx-1 p-3 rounded-2xl border transition-all cursor-pointer group flex items-center gap-2
                ${profileOpen 
                  ? "bg-white/10 border-white/20 shadow-lg" 
                  : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06] shadow-inner"}`}
            >
              <div className="w-7 h-7 rounded-full bg-c4 flex items-center justify-center
                text-sidebar text-[10px] font-extrabold shrink-0">AD</div>
              <div className="flex-1">
                <p className="text-white text-[11px] font-bold leading-none">Admin User</p>
                <p className="text-white/35 text-[10px] mt-0.5">Super Admin</p>
              </div>
              <div className={`transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`}>
                <ChevronRight size={12} className="text-white/20" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#0d2030] border-2 border-white/5 rounded-[28px] p-6 w-full max-w-[320px] shadow-2xl transition-all">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <LogOut size={24} className="text-red-500" />
            </div>
            <h3 className="text-[16px] font-extrabold text-white text-center mb-2">
              Confirm Logout
            </h3>
            <p className="text-[12px] text-white/40 text-center mb-6">
              Are you sure you want to exit the dashboard?
            </p>
            <div className="flex gap-2">
              <button onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 border-[1.5px] border-white/10 rounded-xl text-[13px]
                  font-bold text-white/60 hover:bg-white/5 transition-all">
                Cancel
              </button>
              <button onClick={() => { window.location.href = '/login'; }}
                className="flex-1 py-2.5 bg-red-500 border-none rounded-xl text-[13px]
                  font-bold text-white hover:bg-red-600 shadow-lg shadow-red-500/20 transition-all">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}