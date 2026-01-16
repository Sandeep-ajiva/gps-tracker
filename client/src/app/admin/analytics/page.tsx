"use client";
import React from "react";
import {
    PieChart,
    TrendingUp,
    Users,
    ShoppingBag,
    ArrowUpRight,
    ArrowDownRight,
    Filter,
    Calendar,
    Download
} from "lucide-react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell,
    PieChart as RechartsPieChart,
    Pie
} from "recharts";

const data = [
    { name: "Mon", users: 120, vendors: 45, riders: 28, orders: 450 },
    { name: "Tue", users: 150, vendors: 50, riders: 32, orders: 600 },
    { name: "Wed", users: 180, vendors: 52, riders: 30, orders: 550 },
    { name: "Thu", users: 200, vendors: 55, riders: 40, orders: 800 },
    { name: "Fri", users: 250, vendors: 58, riders: 45, orders: 950 },
    { name: "Sat", users: 300, vendors: 60, riders: 55, orders: 1200 },
    { name: "Sun", users: 280, vendors: 62, riders: 52, orders: 1100 },
];

const categoryData = [
    { name: "Food", value: 45, color: "#1877F2" },
    { name: "Grocery", value: 30, color: "#60B246" },
    { name: "Pharmacy", value: 15, color: "#DB7C38" },
    { name: "Others", value: 10, color: "#282C3F" },
];

export default function AnalyticsPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Platform Analytics</h1>
                    <p className="text-gray-500 font-bold mt-1 text-sm">Deep dive into order trends, user growth, and operational efficiency.</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm font-black">
                        {["Day", "Week", "Month", "Year"].map((t) => (
                            <button
                                key={t}
                                className={`px-4 py-2 rounded-lg text-[10px] uppercase transition-all ${t === 'Week' ? "bg-gray-900 text-white" : "text-gray-400 hover:text-gray-900"}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 bg-white px-5 py-3 rounded-xl border border-gray-100 shadow-sm text-xs font-black text-gray-600 hover:bg-gray-50 transition-all uppercase tracking-widest">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-bold">
                <AnalyticsStat label="Success Rate" value="98.2%" trend="+0.5%" isUp={true} />
                <AnalyticsStat label="Avg. Prep Time" value="18m" trend="-2.4%" isUp={true} />
                <AnalyticsStat label="Returning Users" value="64%" trend="+12%" isUp={true} />
                <AnalyticsStat label="Cancellation" value="1.8%" trend="+0.2%" isUp={false} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100 font-bold">
                    <div className="flex justify-between items-center mb-10">
                        <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest">Order Success vs. Traffic</h2>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Orders</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-blue-200 rounded-full"></span>
                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Traffic</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                                />
                                <Bar dataKey="orders" fill="#1877F2" radius={[6, 6, 0, 0]} barSize={40} />
                                <Bar dataKey="users" fill="#BFDBFE" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 font-bold">
                    <h2 className="text-xl font-black text-gray-900 uppercase tracking-widest mb-10">Category Mix</h2>
                    <div className="h-[300px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RechartsPieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RechartsPieChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest leading-none">Total Value</p>
                            <p className="text-3xl font-black text-gray-900">₹8.4L</p>
                        </div>
                    </div>
                    <div className="mt-10 space-y-4">
                        {categoryData.map((cat) => (
                            <div key={cat.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                                    <span className="text-xs font-black text-gray-600 uppercase tracking-widest">{cat.name}</span>
                                </div>
                                <span className="text-sm font-black text-gray-900">{cat.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function AnalyticsStat({ label, value, trend, isUp }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{label}</p>
            <div className="flex items-end justify-between">
                <h3 className="text-3xl font-black text-gray-900">{value}</h3>
                <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-lg ${isUp ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                    {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {trend}
                </div>
            </div>
        </div>
    );
}
