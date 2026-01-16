"use client";
import React from "react";
import {
    ShoppingBag,
    CircleDollarSign,
    Clock,
    XCircle,
    TrendingUp,
    ChevronRight,
    ArrowUpRight
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
    Area
} from "recharts";

const salesData = [
    { name: "Mon", sales: 4200 },
    { name: "Tue", sales: 3800 },
    { name: "Wed", sales: 5100 },
    { name: "Thu", sales: 4900 },
    { name: "Fri", sales: 6200 },
    { name: "Sat", sales: 8500 },
    { name: "Sun", sales: 7900 },
];

export default function DashboardPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-black text-secondary tracking-tight">G'day, Burger House!</h1>
                    <p className="text-secondary-light font-bold mt-1">Here's what's happening in your store today.</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border-2 border-gray-100 rounded-lg font-bold text-sm text-secondary hover:bg-gray-50 transition-all">
                        Last 7 Days
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Today's Orders"
                    value="42"
                    trend="+12%"
                    icon={<ShoppingBag size={24} />}
                    color="primary"
                />
                <StatCard
                    title="Today's Revenue"
                    value="₹12,450"
                    trend="+8%"
                    icon={<CircleDollarSign size={24} />}
                    color="success"
                />
                <StatCard
                    title="Pending Orders"
                    value="3"
                    icon={<Clock size={24} />}
                    color="warning"
                    isAlert
                />
                <StatCard
                    title="Cancellations"
                    value="1"
                    trend="-2%"
                    icon={<XCircle size={24} />}
                    color="error"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Sales Chart */}
                <div className="lg:col-span-2 card p-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-black text-secondary">Revenue Trends</h2>
                            <p className="text-sm font-bold text-secondary-light">Weekly performance overview</p>
                        </div>
                        <div className="flex items-center gap-1 text-success font-black text-sm">
                            <TrendingUp size={16} />
                            <span>+15.4% from last week</span>
                        </div>
                    </div>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={salesData}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF5200" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#FF5200" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#7E808C', fontSize: 12, fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#7E808C', fontSize: 12, fontWeight: 700 }}
                                    tickFormatter={(value) => `₹${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                                    itemStyle={{ fontWeight: 700, color: '#FF5200' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="sales"
                                    stroke="#FF5200"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorSales)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Popular Items */}
                <div className="card p-8">
                    <h2 className="text-xl font-black text-secondary mb-6">Top Sellers</h2>
                    <div className="space-y-6">
                        <TopItem name="Classic Cheeseburger" category="Main Course" orders={124} />
                        <TopItem name="Spicy Panner Wrap" category="Quick Bites" orders={89} />
                        <TopItem name="French Fries (Large)" category="Sides" orders={156} />
                        <TopItem name="Oreo Milkshake" category="Beverages" orders={67} />
                    </div>
                    <button className="w-full mt-8 py-3 border-2 border-gray-100 rounded-xl font-black text-sm text-secondary hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                        View Menu Reports <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend, icon, color, isAlert }: any) {
    const colors: any = {
        primary: "bg-primary text-white",
        success: "bg-success text-white",
        warning: "bg-warning text-white",
        error: "bg-error text-white",
    };

    return (
        <div className={`card overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer ${isAlert ? "ring-2 ring-warning" : ""}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-xs font-black text-secondary-light uppercase tracking-widest">{title}</p>
                    <h3 className="text-3xl font-black text-secondary mt-2">{value}</h3>
                    {trend && (
                        <p className={`text-xs font-black mt-2 flex items-center gap-1 ${trend.startsWith('+') ? "text-success" : "text-error"}`}>
                            {trend} <span className="text-secondary-light font-bold">vs yesterday</span>
                        </p>
                    )}
                </div>
                <div className={`p-4 rounded-2xl shadow-lg ${colors[color]} group-hover:-rotate-12 transition-transform`}>
                    {icon}
                </div>
            </div>
        </div>
    );
}

function TopItem({ name, category, orders }: any) {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <div>
                <p className="text-sm font-black text-secondary group-hover:text-primary transition-colors">{name}</p>
                <p className="text-[10px] font-bold text-secondary-light uppercase tracking-wider">{category}</p>
            </div>
            <div className="text-right">
                <p className="text-sm font-black text-secondary">{orders}</p>
                <p className="text-[10px] font-bold text-secondary-light">ORDERS</p>
            </div>
        </div>
    );
}
