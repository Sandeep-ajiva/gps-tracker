"use client";
import React from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function OrdersPage() {
    const orders = [
        { id: "#ORD-001", customer: "Liam Johnson", restaurant: "Pizza Hut", date: "Jan 12, 2026", total: "$124.50", status: "Completed" },
        { id: "#ORD-002", customer: "Olivia Smith", restaurant: "Burger King", date: "Jan 12, 2026", total: "$54.20", status: "Processing" },
        { id: "#ORD-003", customer: "Noah Williams", restaurant: "Green Grocer", date: "Jan 11, 2026", total: "$289.00", status: "Completed" },
        { id: "#ORD-004", customer: "Emma Brown", restaurant: "Subway", date: "Jan 10, 2026", total: "$32.00", status: "Cancelled" },
        { id: "#ORD-005", customer: "Ava Jones", restaurant: "Fresh Catch", date: "Jan 09, 2026", total: "$560.00", status: "Pending" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Orders</h1>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3">Order ID</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Store</th>
                            <th className="px-6 py-3">Date</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-bold text-[#1877F2]">{order.id}</td>
                                <td className="px-6 py-4 text-gray-800">{order.customer}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                                        {order.restaurant}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{order.date}</td>
                                <td className="px-6 py-4 text-gray-800 font-semibold">{order.total}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === "Completed" ? "bg-green-100 text-green-700" :
                                        order.status === "Processing" ? "bg-blue-100 text-blue-700" :
                                            order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                                                "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/orders/${order.id.replace('#', '')}`} className="text-gray-500 hover:text-[#1877F2] flex items-center gap-1 ml-auto text-xs font-medium">
                                        <Eye size={16} /> View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
