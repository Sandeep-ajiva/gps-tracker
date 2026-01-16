"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    Settings,
    Store,
    CreditCard,
    ShieldCheck,
    LogOut,
    Bike,
    MapPin,
    Tag,
    PieChart,
    Layers
} from "lucide-react";

const menuGroups = [
    {
        title: "System",
        items: [
            { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
            { name: "Analytics", icon: PieChart, href: "/admin/analytics" },
        ]
    },
    {
        title: "Management",
        items: [
            { name: "Users", icon: Users, href: "/admin/customers" },
            { name: "Vendors", icon: Store, href: "/admin/restaurants" },
            { name: "Delivery Partners", icon: Bike, href: "/admin/riders" },
        ]
    },
    {
        title: "Operations",
        items: [
            { name: "Orders", icon: ShoppingCart, href: "/admin/orders" },
            { name: "Products", icon: Package, href: "/admin/products" },
            { name: "Categories", icon: Layers, href: "/admin/categories" },
        ]
    },
    {
        title: "Logistics",
        items: [
            { name: "Cities & Zones", icon: MapPin, href: "/admin/logistics" },
        ]
    },
    {
        title: "Finance",
        items: [
            { name: "Transactions", icon: CreditCard, href: "/admin/transactions" },
            { name: "Commissions", icon: ShieldCheck, href: "/admin/commissions" },
            { name: "Coupons", icon: Tag, href: "/admin/coupons" },
        ]
    },
    {
        title: "Config",
        items: [
            { name: "Settings", icon: Settings, href: "/admin/settings" },
        ]
    }
];

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col z-50">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-gray-100">
                <span className="text-2xl font-bold text-[#1877F2]">Shopod<span className="text-gray-400 text-sm font-normal ml-1">Admin</span></span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4">
                <div className="space-y-6 px-3">
                    {menuGroups.map((group) => (
                        <div key={group.title}>
                            <h3 className="px-3 mb-2 text-[10px] font-black uppercase text-gray-400 tracking-widest">
                                {group.title}
                            </h3>
                            <ul className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href;
                                    return (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${isActive
                                                    ? "bg-[#1877F2] text-white shadow-lg shadow-[#1877F2]/20"
                                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                                    }`}
                                            >
                                                <item.icon size={18} />
                                                {item.name}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-gray-100">
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
                    className="flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <LogOut size={20} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
