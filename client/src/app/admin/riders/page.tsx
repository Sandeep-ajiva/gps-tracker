"use client";
import React from "react";
import {
    Bike,
    Search,
    Filter,
    MoreHorizontal,
    Star,
    CheckCircle2,
    XCircle,
    Power
} from "lucide-react";

const mockRiders = [
    { id: 1, name: "Rahul Sharma", phone: "9876543210", status: "Online", zone: "Bandra West", rating: 4.8, orders: 12, earnings: 1450 },
    { id: 2, name: "Amit Kumar", phone: "9823456789", status: "In Order", zone: "Andheri East", rating: 4.5, orders: 8, earnings: 920 },
    { id: 3, name: "Suresh P.", phone: "9988776655", status: "Offline", zone: "Mumbai Central", rating: 4.2, orders: 4, earnings: 450 },
    { id: 4, name: "Vikram Singh", phone: "9123456780", status: "Online", zone: "Worli", rating: 4.9, orders: 15, earnings: 1800 },
];

export default function RidersPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Delivery Partners</h1>
                    <p className="text-gray-500 font-bold mt-1 text-sm">Manage, verify, and track your delivery fleet.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg shadow-blue-200 transition-all uppercase tracking-widest">
                    <Bike size={18} /> Add New Partner
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RiderStatCard title="Active Riders" value="452" color="green" />
                <RiderStatCard title="Total Fleet" value="1,245" color="blue" />
                <RiderStatCard title="Average Rating" value="4.7" color="orange" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-bold">
                <div className="p-6 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name, phone or zone..."
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-blue-100 transition-all"
                        />
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-100 rounded-xl text-xs font-black text-gray-600 hover:bg-gray-50 transition-all">
                            <Filter size={16} /> Filters
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 text-white rounded-xl text-xs font-black hover:bg-black transition-all">
                            Export List
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50">
                            <tr>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Partner Details</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Status</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest">Zone</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest text-center">Efficiency</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase text-gray-400 tracking-widest text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {mockRiders.map((rider) => (
                                <tr key={rider.id} className="hover:bg-gray-50/50 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-[#1877F2] font-black text-xl border-2 border-white shadow-sm ring-1 ring-gray-100">
                                                {rider.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-gray-900">{rider.name}</p>
                                                <p className="text-[10px] font-bold text-gray-400 uppercase">{rider.phone}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <StatusBadge status={rider.status} />
                                    </td>
                                    <td className="px-8 py-5 text-sm font-black text-gray-900">{rider.zone}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col items-center">
                                            <div className="flex items-center gap-1 text-sm font-black text-gray-900">
                                                {rider.rating} <Star size={14} className="text-orange-500 fill-orange-500" />
                                            </div>
                                            <p className="text-[10px] font-bold text-gray-400 uppercase mt-1">{rider.orders} Orders Today</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                            <MoreHorizontal size={20} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function RiderStatCard({ title, value, color }: any) {
    const accents: any = {
        green: "bg-green-500",
        blue: "bg-[#1877F2]",
        orange: "bg-orange-500"
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-5 transition-transform group-hover:scale-125 ${accents[color]}`}></div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-3xl font-black text-gray-900">{value}</h3>
            <div className={`mt-4 w-12 h-1.5 rounded-full ${accents[color]}`}></div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles: any = {
        "Online": "bg-green-50 text-green-600 border-green-100",
        "In Order": "bg-blue-50 text-blue-600 border-blue-100",
        "Offline": "bg-gray-100 text-gray-500 border-gray-200"
    };

    return (
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${styles[status]}`}>
            {status}
        </span>
    );
}
