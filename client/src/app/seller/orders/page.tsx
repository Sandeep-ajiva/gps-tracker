"use client";
import React, { useState } from "react";
import {
    Clock,
    CheckCircle2,
    XCircle,
    Truck,
    MoreVertical,
    Check,
    ChefHat,
    ShoppingBag,
    PackageCheck,
    History
} from "lucide-react";

const mockOrders = [
    {
        id: "#ORD-9872",
        customer: "Aman Gupta",
        items: [
            { name: "Classic Cheeseburger", qty: 2, price: 598 },
            { name: "Peri Peri Fries", qty: 1, price: 149 }
        ],
        total: 747,
        status: "Pending",
        time: "2 mins ago",
        type: "Instant"
    },
    {
        id: "#ORD-9865",
        customer: "Sneha Kapoor",
        items: [
            { name: "Veggie Supreme Pizza", qty: 1, price: 449 },
            { name: "Coke 250ml", qty: 2, price: 80 }
        ],
        total: 529,
        status: "Preparing",
        time: "12 mins ago",
        type: "Scheduled"
    },
    {
        id: "#ORD-9860",
        customer: "Rajesh Kumar",
        items: [
            { name: "Chicken Wings (6pc)", qty: 2, price: 650 }
        ],
        total: 650,
        status: "Ready",
        time: "25 mins ago",
        type: "Instant"
    }
];

export default function OrdersPage() {
    const [activeFilter, setActiveFilter] = useState("Live");

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-secondary tracking-tight">Order Management</h1>
                    <p className="text-secondary-light font-bold mt-1 text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse" /> Listening for new incoming orders...
                    </p>
                </div>
                <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                    {["Live", "History", "Cancelled"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`px-6 py-2.5 rounded-lg text-sm font-black transition-all ${activeFilter === f ? "bg-primary text-white shadow-md shadow-primary/20" : "text-secondary-light hover:text-secondary"}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {mockOrders.map((order) => (
                    <div key={order.id} className={`card p-0 overflow-hidden border-l-8 ${order.status === "Pending" ? "border-primary" :
                            order.status === "Preparing" ? "border-warning" :
                                "border-success"
                        }`}>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-black text-secondary">{order.id}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.type === "Instant" ? "bg-primary/10 text-primary" : "bg-purple-100 text-purple-700"
                                            }`}>
                                            {order.type} Delivery
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold text-secondary-light mt-1 uppercase tracking-tighter">{order.customer} • {order.time}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-secondary">₹{order.total}</p>
                                    <span className="text-[10px] font-bold text-secondary-light uppercase">Including Tax</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 mb-6">
                                <ul className="space-y-3">
                                    {order.items.map((item, idx) => (
                                        <li key={idx} className="flex justify-between items-center text-sm font-bold">
                                            <div className="flex items-center gap-3">
                                                <span className="w-6 h-6 bg-white border border-gray-200 rounded flex items-center justify-center text-xs text-primary">{item.qty}x</span>
                                                <span className="text-secondary">{item.name}</span>
                                            </div>
                                            <span className="text-secondary-light text-xs font-medium">₹{item.price}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex items-center gap-3">
                                {order.status === "Pending" ? (
                                    <>
                                        <button className="flex-1 btn-primary py-3 flex items-center justify-center gap-2">
                                            <Check size={18} /> ACCEPT ORDER
                                        </button>
                                        <button className="px-6 py-3 border-2 border-gray-100 rounded-lg font-black text-sm text-error hover:bg-error/5 transition-all">
                                            REJECT
                                        </button>
                                    </>
                                ) : (
                                    <div className="flex flex-1 items-center gap-4">
                                        <div className="flex-1 bg-success/10 border border-success/20 py-3 rounded-lg flex items-center justify-center gap-3">
                                            <div className="bg-success text-white p-1 rounded-full"><Check size={14} /></div>
                                            <span className="text-success font-black text-sm uppercase tracking-wider">{order.status}</span>
                                        </div>
                                        <button className="px-6 py-3 bg-secondary text-white rounded-lg font-black text-sm hover:bg-secondary/90 transition-all uppercase flex items-center gap-2">
                                            {order.status === "Preparing" ? <><PackageCheck size={18} /> MARK READY</> : <><Truck size={18} /> SHIP ORDER</>}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions Footer */}
            <div className="fixed bottom-8 right-8 flex gap-4">
                <button className="p-4 bg-secondary text-white rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-3 border-4 border-white">
                    <History size={24} />
                    <span className="pr-2 font-black text-sm">Today's History</span>
                </button>
            </div>
        </div>
    );
}
