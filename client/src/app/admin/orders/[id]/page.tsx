"use client";
import React, { useState } from "react";
import { ArrowLeft, MapPin, Package, CreditCard, ChevronDown, Check } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderDetailsPage() {
    const params = useParams();
    const [status, setStatus] = useState("Processing");

    const orderItems = [
        { id: 1, name: "Organic Bananas", price: "$4.99", qty: 2, image: "bg-yellow-100" },
        { id: 2, name: "Whole Milk", price: "$3.49", qty: 1, image: "bg-blue-100" },
    ];

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link href="/admin/orders" className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-500">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Order #{params.id}</h1>
                        <p className="text-sm text-gray-500">Placed on Jan 12, 2026 at 10:34 AM</p>
                    </div>
                </div>

                <div className="relative">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-4 pr-10 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" size={16} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Items */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                                <Package size={18} className="text-gray-400" />
                                Order Items
                            </h3>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {orderItems.map((item) => (
                                <div key={item.id} className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-16 h-16 rounded-lg ${item.image}`}></div>
                                        <div>
                                            <p className="font-medium text-gray-900">{item.name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-gray-900">{item.price}</p>
                                </div>
                            ))}
                        </div>
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                            <div className="flex justify-between items-center text-sm mb-2">
                                <span className="text-gray-500">Subtotal</span>
                                <span className="font-medium text-gray-900">$13.47</span>
                            </div>
                            <div className="flex justify-between items-center text-sm mb-2">
                                <span className="text-gray-500">Shipping</span>
                                <span className="font-medium text-gray-900">$5.00</span>
                            </div>
                            <div className="flex justify-between items-center text-base font-bold pt-2 border-t border-gray-200 mt-2">
                                <span className="text-gray-800">Total</span>
                                <span className="text-[#1877F2]">$18.47</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Customer & Shipping */}
                <div className="space-y-6">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-gray-400" />
                            Shipping Details
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                            <p className="font-medium text-gray-900">Liam Johnson</p>
                            <p>123 Main Street, Apt 4B</p>
                            <p>New York, NY 10001</p>
                            <p>USA</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <CreditCard size={18} className="text-gray-400" />
                            Payment Info
                        </h3>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-6 bg-gray-200 rounded"></div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                                <p className="text-xs text-gray-500">Paid on Jan 12, 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
