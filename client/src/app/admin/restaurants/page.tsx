"use client";
import React from "react";
import { Store, Star, Clock, MapPin, Plus } from "lucide-react";

export default function RestaurantsPage() {
    const restaurants = [
        { id: 1, name: "Pizza Hut", rating: 4.5, type: "Italian", status: "Active", location: "Mumbai Central", orders: 1250 },
        { id: 2, name: "Burger King", rating: 4.2, type: "Fast Food", status: "Active", location: "Bandra West", orders: 980 },
        { id: 3, name: "Subway", rating: 4.0, type: "Healthy", status: "Inactive", location: "Andheri East", orders: 450 },
        { id: 4, name: "KFC", rating: 4.3, type: "Fast Food", status: "Active", location: "Juhu", orders: 2100 },
        { id: 5, name: "Domino's", rating: 4.1, type: "Pizza", status: "Pending", location: "Vile Parle", orders: 0 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Restaurants</h1>
                <button className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
                    <Plus size={18} /> Add Restaurant
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                        <Store size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Restaurants</p>
                        <p className="text-2xl font-bold">48</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                        <Star size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Active Partners</p>
                        <p className="text-2xl font-bold">42</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Pending Review</p>
                        <p className="text-2xl font-bold">6</p>
                    </div>
                </div>
            </div>

            {/* Restaurant Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3">Restaurant</th>
                            <th className="px-6 py-3">Type</th>
                            <th className="px-6 py-3">Location</th>
                            <th className="px-6 py-3">Rating</th>
                            <th className="px-6 py-3">Orders</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {restaurants.map((res) => (
                            <tr key={res.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-[#1877F2] font-bold">
                                            {res.name.charAt(0)}
                                        </div>
                                        <span className="font-medium text-gray-900">{res.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{res.type}</td>
                                <td className="px-6 py-4 text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <MapPin size={14} />
                                        {res.location}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1 text-orange-500 font-medium">
                                        <Star size={14} fill="currentColor" />
                                        {res.rating}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-800 font-medium">{res.orders.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${res.status === "Active" ? "bg-green-100 text-green-700" :
                                        res.status === "Inactive" ? "bg-red-100 text-red-700" :
                                            "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {res.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="text-[#1877F2] hover:underline font-medium">Manage</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
