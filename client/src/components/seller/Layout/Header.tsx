"use client";
import React, { useState } from "react";
import { Bell, Search, User, PowerOff, Power } from "lucide-react";

export default function Header() {
    const [isOnline, setIsOnline] = useState(true);

    return (
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-6">
                {/* Store Status Toggle */}
                <button
                    onClick={() => setIsOnline(!isOnline)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all border-2 ${isOnline
                            ? "bg-success/5 border-success text-success"
                            : "bg-error/5 border-error text-error shadow-inner"
                        }`}
                >
                    {isOnline ? <Power size={18} /> : <PowerOff size={18} />}
                    {isOnline ? "STORE ONLINE" : "STORE OFFLINE"}
                </button>

                <div className="h-8 w-[1px] bg-gray-200" />

                <div className="flex items-center gap-2 text-secondary font-bold">
                    <span className="w-2 h-2 rounded-full bg-success animate-ping" />
                    <span className="text-sm">3 Live Orders</span>
                </div>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden md:flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                    <Search size={18} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search order ID..."
                        className="bg-transparent border-none outline-none text-sm w-48 font-medium"
                    />
                </div>

                <button className="relative p-2 text-secondary hover:bg-gray-50 rounded-full transition-all">
                    <Bell size={24} />
                    <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-primary text-white text-[11px] font-black flex items-center justify-center rounded-full border-2 border-white">
                        5
                    </span>
                </button>

                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer group">
                    <div className="text-right">
                        <p className="text-xs font-bold text-secondary-light uppercase tracking-wider">The Burger House</p>
                        <p className="text-sm font-black text-secondary leading-none mt-0.5 group-hover:text-primary transition-colors">Partner Dashboard</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                        <User size={24} className="text-secondary" />
                    </div>
                </div>
            </div>
        </header>
    );
}
