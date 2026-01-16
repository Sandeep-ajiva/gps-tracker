"use client";
import React from "react";
import {
    Boxes,
    AlertTriangle,
    TrendingDown,
    History,
    RefreshCcw,
    ChevronRight,
    Search
} from "lucide-react";

const mockInventory = [
    { id: 1, name: "Classic Cheeseburger Buns", category: "Raw Material", stock: 156, unit: "pcs", status: "In Stock" },
    { id: 2, name: "Frozen Chicken Patties", category: "Meat", stock: 12, unit: "kg", status: "Low Stock" },
    { id: 3, name: "Fresh Lettuce", category: "Vegetables", stock: 0, unit: "kg", status: "Out of Stock" },
    { id: 4, name: "Mozzarella Cheese", category: "Dairy", stock: 25, unit: "kg", status: "In Stock" },
    { id: 5, name: "Tomato Sauce", category: "Sauces", stock: 8, unit: "liters", status: "Low Stock" },
];

export default function InventoryPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-secondary tracking-tight">Inventory & Stock</h1>
                    <p className="text-secondary-light font-bold mt-1 text-sm">Monitor your raw materials and supply levels.</p>
                </div>
                <button className="flex items-center gap-2 bg-secondary text-white px-6 py-3 rounded-xl font-black text-sm shadow-lg transition-all">
                    <RefreshCcw size={20} /> SYNC STOCK
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card border-l-8 border-error">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-black text-secondary-light uppercase tracking-widest">Out of Stock</p>
                            <h3 className="text-3xl font-black text-error mt-2">3 Items</h3>
                            <p className="text-[10px] font-bold text-secondary-light mt-2">Requires immediate restocking</p>
                        </div>
                        <div className="p-3 bg-error text-white rounded-xl">
                            <AlertTriangle size={24} />
                        </div>
                    </div>
                </div>
                <div className="card border-l-8 border-warning">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-black text-secondary-light uppercase tracking-widest">Low Stock Alerts</p>
                            <h3 className="text-3xl font-black text-warning mt-2">8 Items</h3>
                            <p className="text-[10px] font-bold text-secondary-light mt-2">Below safety threshold</p>
                        </div>
                        <div className="p-3 bg-warning text-white rounded-xl">
                            <TrendingDown size={24} />
                        </div>
                    </div>
                </div>
                <div className="card border-l-8 border-success">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xs font-black text-secondary-light uppercase tracking-widest">Healthy Stock</p>
                            <h3 className="text-3xl font-black text-success mt-2">124 Items</h3>
                            <p className="text-[10px] font-bold text-secondary-light mt-2">Optimized for today's orders</p>
                        </div>
                        <div className="p-3 bg-success text-white rounded-xl">
                            <Boxes size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card p-0 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                        <h2 className="text-xl font-black text-secondary">Current Inventory</h2>
                        <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 w-64">
                            <Search size={16} className="text-gray-400" />
                            <input type="text" placeholder="Search stock..." className="bg-transparent border-none outline-none text-xs font-bold w-full" />
                        </div>
                    </div>
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-secondary-light tracking-widest">Ingredient</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-secondary-light tracking-widest">Current Stock</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-secondary-light tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-secondary-light tracking-widest text-right">Update</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockInventory.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/30">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-black text-secondary">{item.name}</p>
                                        <p className="text-[10px] font-bold text-secondary-light uppercase">{item.category}</p>
                                    </td>
                                    <td className="px-6 py-4 font-black text-secondary text-sm">
                                        {item.stock} {item.unit}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${item.status === 'In Stock' ? 'bg-success/10 text-success' :
                                                item.status === 'Low Stock' ? 'bg-warning/10 text-warning' :
                                                    'bg-error/10 text-error'
                                            }`}>{item.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-primary font-black text-[10px] uppercase hover:underline">Update Stock</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card p-0 overflow-hidden">
                    <div className="p-6 border-b border-gray-100 bg-secondary text-white">
                        <div className="flex items-center gap-2 mb-1">
                            <History size={18} />
                            <h2 className="text-lg font-black tracking-tight">Stock History</h2>
                        </div>
                        <p className="text-[10px] font-bold text-white/60 uppercase">Recent adjustments</p>
                    </div>
                    <div className="p-6 space-y-6">
                        <HistoryItem event="Stock Refilled" item="Chicken Patties" qty="+20 kg" time="2h ago" />
                        <HistoryItem event="Used in Orders" item="Burger Buns" qty="-42 pcs" time="4h ago" />
                        <HistoryItem event="Stock Refilled" item="Cheese" qty="+10 kg" time="Yesterday" />
                        <HistoryItem event="Manual Update" item="Sauce" qty="-2 lit" time="Yesterday" />

                        <button className="w-full py-3 border-2 border-gray-100 rounded-xl font-black text-sm text-secondary hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                            View Full Logs <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function HistoryItem({ event, item, qty, time }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${qty.startsWith('+') ? 'bg-success' : 'bg-error'}`} />
                <div>
                    <p className="text-xs font-black text-secondary">{event}: {item}</p>
                    <p className="text-[10px] font-bold text-secondary-light uppercase">{time}</p>
                </div>
            </div>
            <span className={`text-[11px] font-black ${qty.startsWith('+') ? 'text-success' : 'text-error'}`}>{qty}</span>
        </div>
    );
}
