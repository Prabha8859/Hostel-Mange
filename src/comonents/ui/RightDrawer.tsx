"use client";
import { X } from "lucide-react";
import React from "react";

interface RightDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function RightDrawer({ isOpen, onClose, title, children }: RightDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-4 bottom-4 right-4 w-[350px] bg-white dark:bg-[#0d2030] 
        shadow-[0_20px_50px_rgba(0,225,255,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)] 
        z-50 transform transition-all duration-300 ease-in-out border border-c3/30 rounded-[32px]
        ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}>
        <div className="p-5 flex items-center justify-between border-b border-c3/30">
          <h2 className="font-extrabold text-sidebar dark:text-white text-[16px] ml-2">{title}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-c1 rounded-lg transition-colors text-gray-400">
            <X size={18} />
          </button>
        </div>
        <div className="p-5 overflow-y-auto h-[calc(100%-65px)]">
          {children}
        </div>
      </div>
    </>
  );
}