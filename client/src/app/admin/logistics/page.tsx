"use client";
import React from "react";
import {
    MapPin,
    Plus,
    ChevronRight,
    MoreVertical,
    Activity,
    Navigation,
    DollarSign
} from "lucide-react";

const mockCities = [
    { id: 1, name: "Mumbai", zones: 12, riders: 450, status: "Active", charge: "₹30 - ₹60" },
    { id: 2, name: "Delhi", zones: 18, riders: 620, status: "Active", charge: "₹25 - ₹50" },
    { id: 3, name: "Bangalore", zones: 15, riders: 510, status: "Maintenance", charge: "₹40 - ₹80" },
];

export default function LogisticsPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Logistics Control</h1>
                    <p className="text-gray-500 font-bold mt-1 text-sm">Expand your footprint. Manage cities, zones, and delivery tariffs.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg shadow-blue-200 transition-all uppercase tracking-widest">
                    <Plus size={18} /> Add New City
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mockCities.map((city) => (
                    <div key={city.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-xl hover:shadow-gray-100 transition-all group overflow-hidden relative">
                        <div className={`absolute top-0 right-0 p-4 font-black text-[10px] uppercase tracking-widest rounded-bl-2xl ${city.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                            {city.status}
                        </div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">{city.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Live Operations</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8">
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Active Zones</p>
                                <div className="flex items-center gap-2">
                                    <LayersIcon className="text-blue-600" />
                                    <span className="text-xl font-black text-gray-900">{city.zones}</span>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Riders</p>
                                <div className="flex items-center gap-2">
                                    <Activity size={16} className="text-green-500" />
                                    <span className="text-xl font-black text-gray-900">{city.riders}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#1877F2]/5 border border-[#1877F2]/10 rounded-xl p-4 flex items-center justify-between mb-8 font-black">
                            <div>
                                <p className="text-[9px] text-[#1877F2] uppercase tracking-widest mb-1">Delivery Charge</p>
                                <p className="text-sm text-gray-900">{city.charge}</p>
                            </div>
                            <button className="text-[#1877F2] hover:bg-white p-2 rounded-lg transition-colors">
                                <DollarSign size={18} />
                            </button>
                        </div>

                        <div className="flex gap-3 font-bold">
                            <button className="flex-1 py-3 bg-gray-900 text-white rounded-xl text-[10px] uppercase tracking-widest font-black hover:bg-black flex items-center justify-center gap-2">
                                <Navigation size={14} /> Manage Zones
                            </button>
                            <button className="w-12 h-12 flex items-center justify-center border-2 border-gray-100 rounded-xl text-gray-400 hover:text-gray-900 hover:border-gray-200 transition-all">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </div>
                ))}

                <button className="border-2 border-dashed border-gray-100 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 hover:border-blue-200 hover:text-blue-400 hover:bg-blue-50/20 transition-all group">
                    <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-blue-50 transition-colors">
                        <Plus size={32} />
                    </div>
                    <p className="font-black text-xs uppercase tracking-widest">Register New City</p>
                </button>
            </div>
        </div>
    );
}

function LayersIcon({ className }: { className?: string }) {
    return (
        <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
        </svg>
    );
}
