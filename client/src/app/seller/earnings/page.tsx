"use client";
import React from "react";
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    Calendar,
    Download,
    Info,
    CheckCircle2,
    Clock
} from "lucide-react";

export default function EarningsPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-secondary tracking-tight">Financial Overview</h1>
                    <p className="text-secondary-light font-bold mt-1 text-sm">Track your payouts, commission and settlements.</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm text-sm font-black text-secondary hover:bg-gray-50">
                        <Download size={18} /> EXPORT REPORT
                    </button>
                    <button className="flex items-center gap-2 bg-secondary text-white px-5 py-3 rounded-xl font-black text-sm shadow-lg transition-all">
                        <Calendar size={18} /> SELECT DATE
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-secondary text-white border-0 shadow-xl overflow-hidden relative">
                    <div className="relative z-10">
                        <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Available Balance</p>
                        <h3 className="text-4xl font-black mt-2">₹48,250.00</h3>
                        <div className="flex items-center gap-2 mt-6">
                            <button className="flex-1 bg-primary py-3 rounded-xl font-black text-sm">SETTLE NOW</button>
                        </div>
                    </div>
                    <Wallet size={120} className="absolute -bottom-8 -right-8 text-white/5 rotate-12" />
                </div>
                <div className="card">
                    <p className="text-xs font-black text-secondary-light uppercase tracking-widest">Total Earned (MTD)</p>
                    <h3 className="text-3xl font-black text-secondary mt-2">₹1,24,500</h3>
                    <div className="flex items-center gap-2 mt-4 text-success font-black text-xs">
                        <ArrowUpRight size={16} />
                        <span>+22% from last month</span>
                    </div>
                </div>
                <div className="card">
                    <p className="text-xs font-black text-secondary-light uppercase tracking-widest">Commission Paid</p>
                    <h3 className="text-3xl font-black text-secondary mt-2">₹18,675</h3>
                    <div className="flex items-center gap-2 mt-4 text-secondary-light font-bold text-xs">
                        <Info size={16} />
                        <span>Flat 15% Platform Fee</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="card p-8 font-bold">
                    <h2 className="text-xl font-black text-secondary mb-6">Payout History</h2>
                    <div className="space-y-6">
                        <PayoutItem date="12 Jan 2026" amount="₹24,500" status="Completed" />
                        <PayoutItem date="05 Jan 2026" amount="₹18,200" status="Completed" />
                        <PayoutItem date="28 Dec 2025" amount="₹15,400" status="Completed" />
                        <PayoutItem date="21 Dec 2025" amount="₹12,900" status="Processing" />
                    </div>
                </div>

                <div className="card p-8 bg-gray-50 border-dashed border-2 border-gray-200">
                    <h2 className="text-xl font-black text-secondary mb-6">Earnings Breakdown</h2>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-secondary-light uppercase text-xs tracking-wider">Gross Sales</span>
                            <span className="text-secondary font-black">₹1,44,500</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-secondary-light uppercase text-xs tracking-wider">Platform Commission (15%)</span>
                            <span className="text-error font-black">- ₹21,675</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-secondary-light uppercase text-xs tracking-wider">TDS (1%)</span>
                            <span className="text-error font-black">- ₹1,445</span>
                        </div>
                        <div className="flex justify-between items-center py-2 border-b border-gray-100">
                            <span className="text-secondary-light uppercase text-xs tracking-wider">GST (5%)</span>
                            <span className="text-error font-black">- ₹7,225</span>
                        </div>
                        <div className="flex justify-between items-center pt-4">
                            <span className="text-secondary uppercase text-sm font-black tracking-widest">Net Revenue</span>
                            <span className="text-success text-2xl font-black">₹1,14,155</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function PayoutItem({ date, amount, status }: any) {
    return (
        <div className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 px-4 py-3 rounded-xl transition-all -mx-4">
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${status === 'Completed' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}`}>
                    {status === 'Completed' ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                </div>
                <div>
                    <p className="text-sm font-black text-secondary">{amount}</p>
                    <p className="text-[10px] text-secondary-light uppercase tracking-widest">{date}</p>
                </div>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${status === 'Completed' ? 'text-success' : 'text-warning'}`}>
                {status}
            </span>
        </div>
    );
}
