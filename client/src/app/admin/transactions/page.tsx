"use client";
import React from "react";
import { CreditCard, ArrowUpRight, ArrowDownLeft, Filter, Download } from "lucide-react";

export default function TransactionsPage() {
    const transactions = [
        { id: "TXN-001", orderId: "#ORD-001", customer: "Liam Johnson", amount: "$124.50", method: "Credit Card", status: "Success", date: "Jan 12, 2026, 14:30" },
        { id: "TXN-002", orderId: "#ORD-002", customer: "Olivia Smith", amount: "$54.20", method: "Razorpay", status: "Success", date: "Jan 12, 2026, 12:15" },
        { id: "TXN-003", orderId: "#ORD-003", customer: "Noah Williams", amount: "$289.00", method: "COD", status: "Pending", date: "Jan 11, 2026, 19:45" },
        { id: "TXN-004", orderId: "#ORD-004", customer: "Emma Brown", amount: "$32.00", method: "UPI", status: "Failed", date: "Jan 10, 2026, 10:20" },
        { id: "TXN-005", orderId: "#ORD-005", customer: "Ava Jones", amount: "$560.00", method: "Bank Transfer", status: "Success", date: "Jan 09, 2026, 16:00" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition text-sm font-medium text-gray-600">
                        <Download size={18} /> Export
                    </button>
                    <button className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
                        <Filter size={18} /> Filter
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Total Volume</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900">$12,450.00</h3>
                        <span className="text-green-600 text-xs font-semibold">+12%</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Success Rate</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900">98.2%</h3>
                        <span className="text-green-600 text-xs font-semibold">+2.1%</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Failed Payments</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900">45</h3>
                        <span className="text-red-600 text-xs font-semibold">+5</span>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-sm text-gray-500 mb-1">Refunds</p>
                    <div className="flex items-baseline gap-2">
                        <h3 className="text-2xl font-bold text-gray-900">$450.00</h3>
                        <span className="text-gray-400 text-xs font-semibold">0%</span>
                    </div>
                </div>
            </div>

            {/* Transaction Table */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3">Transaction ID</th>
                            <th className="px-6 py-3">Order</th>
                            <th className="px-6 py-3">Customer</th>
                            <th className="px-6 py-3">Method</th>
                            <th className="px-6 py-3">Amount</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((txn) => (
                            <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{txn.id}</td>
                                <td className="px-6 py-4 text-[#1877F2] font-semibold">{txn.orderId}</td>
                                <td className="px-6 py-4 text-gray-800">{txn.customer}</td>
                                <td className="px-6 py-4 text-gray-500">{txn.method}</td>
                                <td className="px-6 py-4 text-gray-900 font-bold">{txn.amount}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-2 h-2 rounded-full ${txn.status === "Success" ? "bg-green-500" :
                                            txn.status === "Failed" ? "bg-red-500" : "bg-yellow-500"
                                            }`} />
                                        <span className={`text-xs font-semibold ${txn.status === "Success" ? "text-green-700" :
                                            txn.status === "Failed" ? "text-red-700" : "text-yellow-700"
                                            }`}>
                                            {txn.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-xs">{txn.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
