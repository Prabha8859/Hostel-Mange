"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUIStore } from "../../store/useUIStore";
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
    <aside className={`sticky top-0 h-screen flex flex-col bg-sidebar text-white relative overflow-hidden
      border-r border-white/5 transition-all duration-500 shrink-0 z-20 shadow-[8px_0_30px_rgba(0,0,0,0.5)]
      ${collapsed ? "w-[70px]" : "w-60"}`}>

      {/* Animated Background Mesh & Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[200px] h-[200px] bg-c4/10 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute top-[30%] -right-[20%] w-[250px] h-[250px] bg-blue-600/10 rounded-full blur-[100px] animate-pulse [animation-duration:8s]" />
        <div className="absolute -bottom-[10%] left-[10%] w-[180px] h-[180px] bg-indigo-500/15 rounded-full blur-[70px] animate-pulse [animation-duration:12s]" />
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      {/* Logo & Toggle Header - Relative Z-10 to stay above mesh */}
      <div className="relative z-10 flex items-center justify-between px-4 py-[20px] border-b border-white/5 overflow-hidden">
        <div 
          onClick={collapsed ? toggleSidebar : undefined}
          className={`flex items-center gap-3 transition-transform duration-300 ${collapsed ? "cursor-pointer hover:scale-110 active:scale-95" : ""}`}
        >
          <div className="w-[38px] h-[38px] rounded-xl bg-c4 flex items-center justify-center
            text-sidebar font-extrabold text-[14px] shrink-0 shadow-[0_0_20px_rgba(0,225,255,0.5)]">HP</div>
          {!collapsed && (
            <span className="font-bold text-[16px] whitespace-nowrap animate-in fade-in slide-in-from-left-4 duration-500">
              HostelPro
            </span>
          )}
        </div>

        {!collapsed && (
          <button onClick={toggleSidebar}
            className="p-1 rounded-lg hover:bg-white/5 text-white/30 hover:text-c4 transition-all duration-300">
            <ChevronLeft size={18} />
          </button>
        )}
      </div>

      <nav className="relative z-10 flex-1 px-2 pb-4 space-y-0.5">
        {!collapsed && (
          <p className="text-[9px] font-bold text-white/25 uppercase tracking-[1.5px] px-2 pt-2 pb-1">
            Main
          </p>
        )}

        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty("--x", `${x}px`);
                e.currentTarget.style.setProperty("--y", `${y}px`);
                // Magnetic effect calculation
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                e.currentTarget.style.setProperty("--mx", `${(x - centerX) / 10}px`);
                e.currentTarget.style.setProperty("--my", `${(y - centerY) / 5}px`);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.setProperty("--mx", "0px");
                e.currentTarget.style.setProperty("--my", "0px");
              }}
              className={`group flex items-center gap-2.5 px-3 py-[12px] rounded-2xl
                transition-all duration-500 relative overflow-hidden mb-1 border border-transparent
                ${active
                  ? "bg-gradient-to-r from-c4/20 via-c4/5 to-transparent text-white shadow-[inset_0_0_20px_rgba(0,225,255,0.1)] border-white/5"
                  : "text-white/40 hover:text-white hover:border-white/10"
                }
                before:absolute before:inset-0 before:bg-[radial-gradient(100px_circle_at_var(--x)_var(--y),rgba(0,225,255,0.12),transparent_100%)] before:opacity-0 hover:before:opacity-100 before:transition-opacity`}
            >
              {active && <div className="absolute left-0 top-3 bottom-3 w-[4px] bg-c4 rounded-r-full shadow-[0_0_15px_#00E1FF] z-10" />}
              
              <span style={{ transform: "translate(var(--mx), var(--my))" }} className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 relative z-10
                transition-all duration-500 ease-out
                ${active ? "text-c4 bg-c4/10 scale-110" : "bg-white/5 group-hover:bg-c4/15 group-hover:text-c4 group-hover:rotate-[8deg] group-hover:scale-110"}`}>
                <Icon size={15} />
              </span>
              {!collapsed && (
                <span style={{ transform: "translate(var(--mx), var(--my))" }} className={`text-[13px] flex-1 whitespace-nowrap transition-all duration-500 relative z-10
                  ${active ? "font-bold text-white" : "font-medium group-hover:text-c4 group-hover:drop-shadow-[0_0_8px_rgba(0,225,255,0.5)]"}`}>
                  {item.label}
                </span>
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

      <div className="relative z-10 mt-auto px-2 pb-4 space-y-1">
        {/* Logout Button */}
        <button 
          onClick={() => setShowLogoutModal(true)}
          className={`group flex items-center gap-2.5 px-3 py-[12px] rounded-2xl w-full
            transition-all duration-500 relative overflow-hidden text-red-400/60 hover:bg-red-500/10 hover:text-red-400 hover:translate-x-1`}
        >
          <span className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-red-500/5 group-hover:bg-red-500/20 group-hover:rotate-[-12deg] transition-all duration-500">
            <LogOut size={16} />
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
              className={`mx-1 p-3 rounded-2xl border transition-all duration-500 cursor-pointer group flex items-center gap-2
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