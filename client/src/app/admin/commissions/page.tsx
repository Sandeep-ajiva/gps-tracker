"use client";
import React from "react";
import {
    CreditCard,
    ArrowUpRight,
    ShieldCheck,
    Settings,
    LayoutGrid,
    CheckCircle2,
    Clock,
    Download
} from "lucide-react";

export default function CommissionsPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Finance & Commissions</h1>
                    <p className="text-gray-500 font-bold mt-1 text-sm">Configure revenue share and manage platform settlements.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest">
                        <Download size={16} /> Settlement Report
                    </button>
                    <button className="bg-gray-900 text-white px-6 py-3 rounded-xl font-black text-xs shadow-lg transition-all uppercase tracking-widest">
                        Global Finance Config
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 font-bold">
                        <h2 className="text-xl font-black text-gray-900 tracking-tight mb-8">Platform Commission Structure</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <CommissionConfigCard
                                category="Restaurants"
                                percentage="25%"
                                type="Flat Commission"
                                color="orange"
                            />
                            <CommissionConfigCard
                                category="Groceries"
                                percentage="15%"
                                type="Flat Commission"
                                color="green"
                            />
                            <CommissionConfigCard
                                category="Pharmacy"
                                percentage="10%"
                                type="Flat Commission"
                                color="blue"
                            />
                            <CommissionConfigCard
                                category="Electronics"
                                percentage="8%"
                                type="Tiered Commission"
                                color="purple"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-bold">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Pending Vendor Payouts</h2>
                            <button className="text-[10px] font-black text-[#1877F2] uppercase tracking-widest hover:underline">Process All</button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            <PayoutItem vendor="Burger King" amount="₹42,500" orders="124" date="12 Jan" />
                            <PayoutItem vendor="Pizza Hut" amount="₹28,200" orders="82" date="11 Jan" />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden font-bold">
                        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                            <h2 className="text-lg font-black text-gray-900 uppercase tracking-widest">Pending Rider Settlements</h2>
                            <button className="text-[10px] font-black text-[#1877F2] uppercase tracking-widest hover:underline">Clear All Dues</button>
                        </div>
                        <div className="divide-y divide-gray-50">
                            <PayoutItem rider name="Rahul Sharma" amount="₹4,250" orders="18" date="Today" />
                            <PayoutItem rider name="Amit Kumar" amount="₹3,100" orders="12" date="Today" />
                        </div>
                    </div>
                </div>

                <div className="space-y-8 font-bold">
                    <div className="bg-gradient-to-br from-[#1877F2] to-blue-700 p-8 rounded-2xl shadow-xl text-white relative overflow-hidden">
                        <p className="text-xs font-black uppercase tracking-widest opacity-60">Total Platform Earnings</p>
                        <h3 className="text-4xl font-black mt-2">₹1,48,250</h3>
                        <div className="flex items-center gap-2 mt-4 text-white/80 text-xs">
                            <ArrowUpRight size={16} />
                            <span>+18% growth this month</span>
                        </div>
                        <CreditCard size={120} className="absolute -bottom-8 -right-8 opacity-10 rotate-12" />
                    </div>

                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-widest">Config Summary</h2>
                        <div className="space-y-4">
                            <ConfigLine label="TDS Deduction" value="1.0%" />
                            <ConfigLine label="GST Identification" value="18.0%" />
                            <ConfigLine label="Payout Cycle" value="Daily" />
                            <ConfigLine label="Min Settlement" value="₹1,000" />
                        </div>
                        <button className="w-full mt-8 py-4 bg-gray-50 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest hover:bg-gray-100 hover:text-gray-900 transition-all">
                            Edit Global Rules
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CommissionConfigCard({ category, percentage, type, color }: any) {
    const accents: any = {
        orange: "text-orange-500 bg-orange-50",
        green: "text-green-600 bg-green-50",
        blue: "text-blue-600 bg-blue-50",
        purple: "text-purple-600 bg-purple-50"
    };

    return (
        <div className="p-6 rounded-2xl border border-gray-100 hover:border-blue-100 transition-all">
            <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${accents[color]}`}>
                    {category}
                </span>
                <button className="text-gray-300 hover:text-blue-600 transition-colors">
                    <Settings size={16} />
                </button>
            </div>
            <h4 className="text-3xl font-black text-gray-900">{percentage}</h4>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{type}</p>
        </div>
    );
}

function PayoutItem({ vendor, name, amount, orders, date, rider }: any) {
    return (
        <div className="px-8 py-5 flex items-center justify-between group hover:bg-gray-50/50 transition-all">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center ${rider ? 'text-green-600' : 'text-[#1877F2]'}`}>
                    {rider ? <Bike size={18} /> : <Clock size={18} />}
                </div>
                <div>
                    <p className="text-sm font-black text-gray-900">{rider ? name : vendor}</p>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{orders} {rider ? 'Trips' : 'Orders'} • {date}</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <span className="text-lg font-black text-gray-900">{amount}</span>
                <button className={`px-4 py-2 ${rider ? 'bg-green-600' : 'bg-[#1877F2]'} text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg transition-all opacity-0 group-hover:opacity-100`}>
                    Pay Now
                </button>
            </div>
        </div>
    );
}

function ConfigLine({ label, value }: any) {
    return (
        <div className="flex items-center justify-between py-1">
            <span className="text-xs text-gray-400 uppercase tracking-widest">{label}</span>
            <span className="text-sm font-black text-gray-900">{value}</span>
        </div>
    );
}
