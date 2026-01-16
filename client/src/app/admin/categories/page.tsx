"use client";
import React from "react";
import {
    Layers,
    Plus,
    Edit2,
    Trash2,
    ChevronRight,
    Search,
    Image as ImageIcon
} from "lucide-react";

const mockCategories = [
    { id: 1, name: "Food & Restaurants", sub: "12 Sub-categories", items: "1,245 Items", icon: "🍔", status: "Active" },
    { id: 2, name: "Groceries", sub: "45 Sub-categories", items: "8,920 Items", icon: "🥦", status: "Active" },
    { id: 3, name: "Pharmacy", sub: "8 Sub-categories", items: "540 Items", icon: "💊", status: "Active" },
    { id: 4, name: "Electronics", sub: "15 Sub-categories", items: "2,100 Items", icon: "🎧", status: "Maintenance" },
];

export default function CategoriesPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Global Categories</h1>
                    <p className="text-gray-500 font-bold mt-1 text-sm">Organize the entire platform's product hierarchy.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg shadow-blue-200 transition-all uppercase tracking-widest">
                    <Plus size={18} /> Create New Category
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {mockCategories.map((cat) => (
                    <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 flex items-center justify-between group hover:border-[#1877F2] transition-all">
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl group-hover:bg-blue-50 transition-colors">
                                {cat.icon}
                            </div>
                            <div className="font-bold">
                                <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest mb-2 inline-block ${cat.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                                    {cat.status}
                                </span>
                                <h3 className="text-xl font-black text-gray-900 tracking-tight">{cat.name}</h3>
                                <div className="flex items-center gap-3 mt-1 text-[11px] text-gray-400 uppercase tracking-widest">
                                    <span>{cat.sub}</span>
                                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                    <span>{cat.items}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                            <button className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                <Edit2 size={18} />
                            </button>
                            <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-red-50 hover:text-red-500 transition-all shadow-sm">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                <button className="border-2 border-dashed border-gray-100 rounded-2xl flex items-center justify-center p-8 text-gray-400 hover:border-blue-200 hover:text-blue-400 hover:bg-blue-50/20 transition-all group">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            <Plus size={24} />
                        </div>
                        <p className="font-black text-sm uppercase tracking-widest">Create Category</p>
                    </div>
                </button>
            </div>

            <div className="card p-0 overflow-hidden mt-8">
                <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                    <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Recent Sub-categories</h2>
                    <button className="text-[10px] font-black text-[#1877F2] uppercase tracking-widest hover:underline">View All Hierarchies</button>
                </div>
                <div className="divide-y divide-gray-50">
                    <SubCatItem parent="Food" name="North Indian" count="450 items" />
                    <SubCatItem parent="Food" name="Chinese" count="320 items" />
                    <SubCatItem parent="Groceries" name="Fruits & Vegetables" count="890 items" />
                    <SubCatItem parent="Groceries" name="Dairy & Eggs" count="210 items" />
                </div>
            </div>
        </div>
    );
}

function SubCatItem({ parent, name, count }: any) {
    return (
        <div className="px-8 py-5 flex items-center justify-between group hover:bg-gray-50/30 transition-all">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                    <Layers size={18} />
                </div>
                <div>
                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-0.5">{parent}</p>
                    <p className="text-sm font-black text-gray-900">{name}</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{count}</span>
                <ChevronRight size={18} className="text-gray-200 group-hover:text-gray-400 transition-colors" />
            </div>
        </div>
    );
}
