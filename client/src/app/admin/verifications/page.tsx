"use client";
import React, { useState } from "react";
import { ShieldCheck, Mail, UserCheck, AlertCircle, CheckCircle2, XCircle } from "lucide-react";

export default function VerificationsPage() {
    const [activeTab, setActiveTab] = useState("merchants");

    const merchants = [
        { id: "V-001", name: "Fresh Catch Seafood", type: "Merchant", status: "Pending", submitted: "2 hours ago", documents: ["FSSAI", "GST"] },
        { id: "V-002", name: "Green Grocer", type: "Merchant", status: "Approved", submitted: "1 day ago", documents: ["FSSAI", "GST", "PAN"] },
        { id: "V-003", name: "Spicy Bites", type: "Merchant", status: "Rejected", submitted: "3 days ago", documents: ["FSSAI"] },
    ];

    const users = [
        { id: "U-101", name: "Alice Smith", email: "alice@example.com", status: "Verified", date: "Jan 12, 2026" },
        { id: "U-102", name: "Bob Wilson", email: "bob@testmail.com", status: "Unverified", date: "Jan 13, 2026" },
        { id: "U-103", name: "Charlie Brown", email: "charlie@web.com", status: "Verified", date: "Jan 11, 2026" },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-800">Verifications</h1>

            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button
                    onClick={() => setActiveTab("merchants")}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === "merchants" ? "border-[#1877F2] text-[#1877F2]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                    Merchant Identity
                </button>
                <button
                    onClick={() => setActiveTab("users")}
                    className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === "users" ? "border-[#1877F2] text-[#1877F2]" : "border-transparent text-gray-500 hover:text-gray-700"}`}
                >
                    User Emails
                </button>
            </div>

            {activeTab === "merchants" ? (
                <div className="grid gap-4">
                    {merchants.map((merchant) => (
                        <div key={merchant.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-full ${merchant.status === "Approved" ? "bg-green-100 text-green-600" : merchant.status === "Rejected" ? "bg-red-100 text-red-600" : "bg-orange-100 text-orange-600"}`}>
                                    <UserCheck size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{merchant.name}</h3>
                                    <p className="text-xs text-gray-500">Submitted {merchant.submitted} • Ref: {merchant.id}</p>
                                    <div className="flex gap-2 mt-2">
                                        {merchant.documents.map(doc => (
                                            <span key={doc} className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase tracking-wider">{doc}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${merchant.status === "Approved" ? "bg-green-100 text-green-700" : merchant.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>
                                    {merchant.status}
                                </span>
                                <button className="text-gray-400 hover:text-[#1877F2] transition">
                                    <ShieldCheck size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[#F9FAFB] text-gray-600 font-medium border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Joined</th>
                                <th className="px-6 py-3 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b border-gray-100">
                                    <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                    <td className="px-6 py-4 text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            {user.status === "Verified" ? (
                                                <CheckCircle2 size={16} className="text-green-500" />
                                            ) : (
                                                <AlertCircle size={16} className="text-orange-500" />
                                            )}
                                            <span className={user.status === "Verified" ? "text-green-700 font-medium" : "text-orange-700 font-medium"}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{user.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-[#1877F2] text-xs font-bold hover:underline">
                                            {user.status === "Verified" ? "Re-verify" : "Send Mail"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
