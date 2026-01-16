"use client";
import React from "react";
import {
    Store,
    MapPin,
    Clock,
    Smartphone,
    CreditCard,
    Save,
    Image as ImageIcon
} from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 pb-10 max-w-4xl">
            <div>
                <h1 className="text-3xl font-black text-secondary tracking-tight">Store Settings</h1>
                <p className="text-secondary-light font-bold mt-1 text-sm">Your business information and operational preferences.</p>
            </div>

            <div className="space-y-6">
                <div className="card p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary/10 text-primary rounded-lg">
                            <Store size={22} />
                        </div>
                        <h2 className="text-xl font-black text-secondary">General Information</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-secondary-light uppercase tracking-widest">Store Name</label>
                            <input type="text" className="input-field font-bold" defaultValue="The Burger House" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-secondary-light uppercase tracking-widest">Business Email</label>
                            <input type="email" className="input-field font-bold" defaultValue="contact@burgerhouse.com" />
                        </div>
                        <div className="space-y-2 lg:col-span-2">
                            <label className="text-xs font-black text-secondary-light uppercase tracking-widest">Store Address</label>
                            <textarea className="input-field font-bold h-24 pt-3" defaultValue="Shop 4, Bandra West, Mumbai, Maharashtra 400050" />
                        </div>
                    </div>
                </div>

                <div className="card p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-success/10 text-success rounded-lg">
                            <Clock size={22} />
                        </div>
                        <h2 className="text-xl font-black text-secondary">Operational Hours</h2>
                    </div>

                    <div className="space-y-4">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                            <div key={day} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                                <span className="text-sm font-black text-secondary">{day}</span>
                                <div className="flex items-center gap-4">
                                    <input type="time" className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold" defaultValue="10:00" />
                                    <span className="text-xs font-bold text-gray-400 uppercase">to</span>
                                    <input type="time" className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-bold" defaultValue="23:00" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-warning/10 text-warning rounded-lg">
                            <CreditCard size={22} />
                        </div>
                        <h2 className="text-xl font-black text-secondary">Payout & GST</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-secondary-light uppercase tracking-widest">GST Number</label>
                            <input type="text" className="input-field font-bold uppercase" defaultValue="27AAAAA0000A1Z5" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-secondary-light uppercase tracking-widest">Bank Account Number</label>
                            <input type="password" underline className="input-field font-bold" defaultValue="************1234" />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <button className="px-8 py-4 bg-gray-100 text-secondary font-black rounded-xl hover:bg-gray-200 transition-all uppercase tracking-widest text-xs">Discard Changes</button>
                    <button className="px-10 py-4 bg-primary text-white font-black rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/30 transition-all uppercase tracking-widest text-xs flex items-center gap-2">
                        <Save size={18} /> Save Settings
                    </button>
                </div>
            </div>
        </div>
    );
}
