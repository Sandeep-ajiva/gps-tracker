"use client";
import React, { useState } from "react";
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Image as ImageIcon,
    MoreHorizontal,
    ToggleLeft,
    ToggleRight
} from "lucide-react";

const mockMenu = [
    { id: 1, name: "Classic Cheeseburger", category: "Burgers", price: 299, stock: 45, status: "In Stock" },
    { id: 2, name: "Spicy Paneer Wrap", category: "Wraps", price: 189, stock: 12, status: "Low Stock" },
    { id: 3, name: "French Fries (L)", category: "Sides", price: 149, stock: 0, status: "Out of Stock" },
    { id: 4, name: "Oreo Milkshake", category: "Beverages", price: 199, stock: 25, status: "In Stock" },
    { id: 5, name: "Veggie Supreme Pizza", category: "Pizza", price: 449, stock: 8, status: "In Stock" },
];

export default function MenuPage() {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-secondary tracking-tight">Menu Management</h1>
                    <p className="text-secondary-light font-bold mt-1 text-sm">Control your offerings and visibility.</p>
                </div>
                <button className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-black text-sm shadow-lg shadow-primary/20 transition-all">
                    <Plus size={20} /> ADD NEW ITEM
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm">
                    <Search size={20} className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search items by name or category..."
                        className="bg-transparent border-none outline-none text-sm w-full font-bold text-secondary"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm text-sm font-black text-secondary hover:bg-gray-50">
                        <Filter size={18} /> Categories
                    </button>
                    <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm text-sm font-black text-secondary hover:bg-gray-50">
                        <Filter size={18} /> Availability
                    </button>
                </div>
            </div>

            <div className="card p-0 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-secondary-light tracking-widest">Item Detail</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-secondary-light tracking-widest">Category</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-secondary-light tracking-widest">Price</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-secondary-light tracking-widest">Stock</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-secondary-light tracking-widest">Status</th>
                            <th className="px-8 py-5 text-[10px] font-black uppercase text-secondary-light tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {mockMenu.map((item) => (
                            <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200 group-hover:border-primary/30 transition-colors">
                                            <ImageIcon size={20} className="text-gray-400 group-hover:text-primary transition-colors" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-secondary">{item.name}</p>
                                            <p className="text-[10px] font-bold text-secondary-light uppercase tracking-tighter">ID: ITM-00{item.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-[10px] font-black text-secondary uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                </td>
                                <td className="px-8 py-5 text-sm font-black text-secondary">₹{item.price}</td>
                                <td className="px-8 py-5">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-black text-secondary">{item.stock}</span>
                                        <div className="w-20 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${item.status === 'Low Stock' ? 'bg-warning' : item.status === 'Out of Stock' ? 'bg-error' : 'bg-success'}`}
                                                style={{ width: `${Math.min(item.stock * 2, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-5">
                                    <div className="flex items-center gap-2">
                                        {item.status === "In Stock" ? (
                                            <ToggleRight size={24} className="text-success cursor-pointer" />
                                        ) : (
                                            <ToggleLeft size={24} className="text-gray-300 cursor-pointer" />
                                        )}
                                        <span className={`text-[10px] font-black uppercase ${item.status === 'Low Stock' ? 'text-warning' : item.status === 'Out of Stock' ? 'text-error' : 'text-success'}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button className="p-2 text-secondary-light hover:text-primary hover:bg-primary/5 rounded-lg transition-all">
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="p-2 text-secondary-light hover:text-error hover:bg-error/5 rounded-lg transition-all">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
