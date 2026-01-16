"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ClipboardList,
    UtensilsCrossed,
    Boxes,
    Wallet,
    Settings,
    Star,
    Bell,
    LogOut,
    Store,
    Activity
} from "lucide-react";

const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/seller" },
    { name: "Live Orders", icon: Activity, href: "/seller/orders", badge: "Live" },
    { name: "Menu Management", icon: UtensilsCrossed, href: "/seller/menu" },
    { name: "Inventory", icon: Boxes, href: "/seller/inventory" },
    { name: "Earnings", icon: Wallet, href: "/seller/earnings" },
    { name: "Reviews", icon: Star, href: "/seller/reviews" },
    { name: "Settings", icon: Settings, href: "/seller/settings" },
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-secondary h-screen fixed left-0 top-0 flex flex-col z-50 text-white">
            {/* Logo */}
            <div className="h-20 flex items-center px-6 border-b border-gray-700">
                <div className="bg-primary p-1.5 rounded-lg mr-3 shadow-lg">
                    <Store size={22} className="text-white" />
                </div>
                <div>
                    <span className="text-xl font-black tracking-tight">SHOPOD</span>
                    <p className="text-[10px] font-bold text-primary tracking-widest uppercase -mt-1">Seller Partner</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6">
                <ul className="space-y-1 px-3">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.name}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center justify-between px-3 py-3 rounded-lg text-sm font-semibold transition-all ${isActive
                                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon size={20} />
                                        {item.name}
                                    </div>
                                    {item.badge && (
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase ${isActive ? "bg-white text-primary" : "bg-primary text-white animate-pulse"}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={() => {
                        if (typeof window !== "undefined") {
                            const confirmLogout = window.confirm("Are you sure you want to sign out?");
                            if (confirmLogout) {
                                localStorage.removeItem("token");
                                localStorage.removeItem("userRole");
                                window.location.href = "/login";
                            }
                        }
                    }}
                    className="flex items-center gap-3 w-full px-3 py-3 text-sm font-bold text-gray-400 hover:text-error transition-colors"
                >
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
