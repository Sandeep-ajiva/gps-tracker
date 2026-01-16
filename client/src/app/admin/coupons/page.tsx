"use client";
import React from "react";
import {
    Tag,
    Plus,
    Calendar,
    Trash2,
    Edit,
    Copy,
    ChevronRight,
    Search,
    Ticket
} from "lucide-react";

const mockCoupons = [
    { id: 1, code: "WELCOME50", discount: "50% OFF", type: "Percentage", limit: "Max ₹100", usage: "1,245", status: "Active" },
    { id: 2, code: "SHOPOD200", discount: "₹200 FLAT", type: "Flat", limit: "Min Order ₹1000", usage: "842", status: "Active" },
    { id: 3, code: "PIZZA50", discount: "50% OFF", type: "Vendor Specific", limit: "Only at Pizza Hut", usage: "320", status: "Expired" },
    { id: 4, code: "FREEDEL", discount: "FREE DELIVERY", type: "Service", limit: "No Max Cap", usage: "5,120", status: "Active" },
];

export default function CouponsPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Offers & Coupons</h1>
                    <p className="text-gray-500 font-bold mt-1 text-sm">Drive growth with strategic discounts and rewards.</p>
                </div>
                <button className="flex items-center gap-2 bg-[#1877F2] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg shadow-blue-200 transition-all uppercase tracking-widest">
                    <Plus size={18} /> Create New Offer
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockCoupons.map((coupon) => (
                    <div key={coupon.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group flex flex-col font-bold">
                        <div className={`p-6 ${coupon.status === 'Active' ? 'bg-blue-600' : 'bg-gray-400'} text-white relative`}>
                            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-lg p-2 group-hover:bg-white/30 transition-all cursor-pointer">
                                <Copy size={14} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">{coupon.type}</p>
                            <h3 className="text-2xl font-black tracking-tight mb-4">{coupon.code}</h3>
                            <div className="inline-block px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-lg text-xs font-black uppercase tracking-widest">
                                {coupon.discount}
                            </div>
                            <Ticket size={80} className="absolute -bottom-8 -right-8 opacity-10 -rotate-12" />
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Condition</p>
                                    <p className="text-sm text-gray-900">{coupon.limit}</p>
                                </div>
                                <div className="flex items-center justify-between py-3 border-y border-gray-50">
                                    <div className="flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-widest">
                                        <Calendar size={14} /> Expiry: 12 Mar
                                    </div>
                                    <div className="text-[10px] font-black text-[#1877F2] uppercase tracking-widest">
                                        {coupon.usage} Used
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 flex gap-2">
                                <button className="flex-1 py-3 bg-gray-50 text-gray-900 rounded-xl text-[10px] uppercase font-black hover:bg-gray-100 transition-all">
                                    Edit Offer
                                </button>
                                <button className="w-12 h-12 flex items-center justify-center text-red-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                <button className="border-4 border-dashed border-gray-50 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-300 hover:border-blue-100 hover:text-blue-300 hover:bg-blue-50/10 transition-all group">
                    <Plus size={40} className="mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-xs font-black uppercase tracking-widest">Add Coupon</p>
                </button>
            </div>

            <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                        <Tag size={32} />
                    </div>
                    <div className="font-bold">
                        <h3 className="text-xl font-black text-gray-900 leading-tight">Flash Sale Campaign</h3>
                        <p className="text-gray-500 text-sm mt-1">Automatically apply discounts globally for the next 4 hours.</p>
                    </div>
                </div>
                <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl hover:bg-black transition-all">
                    Launch Flash Sale
                </button>
            </div>
        </div>
    );
}
