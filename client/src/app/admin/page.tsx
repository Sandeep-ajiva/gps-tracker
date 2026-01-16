"use client";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Store,
  Bike,
  MapPin,
  Zap,
  ShoppingCart,
  ArrowUpRight,
  ArrowDownRight
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
  LineChart,
  Line
} from "recharts";

const performanceData = [
  { name: "Mon", orders: 450, revenue: 2400 },
  { name: "Tue", orders: 600, revenue: 3200 },
  { name: "Wed", orders: 550, revenue: 2800 },
  { name: "Thu", orders: 800, revenue: 4200 },
  { name: "Fri", orders: 950, revenue: 5100 },
  { name: "Sat", orders: 1200, revenue: 6800 },
  { name: "Sun", orders: 1100, revenue: 6200 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Super Admin Dashboard</h1>
          <p className="text-gray-500 font-bold mt-1">Platform-wide performance and operational health.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 border border-green-200 uppercase tracking-widest">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            System Live
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value="₹12,45,231"
          icon={<DollarSign size={20} />}
          color="blue"
          trend="+12.5%"
          isUp={true}
        />
        <StatCard
          title="Total Vendors"
          value="1,248"
          icon={<Store size={20} />}
          color="orange"
          trend="+4.2%"
          isUp={true}
        />
        <StatCard
          title="Active Riders"
          value="452"
          icon={<Bike size={20} />}
          color="green"
          trend="-2.1%"
          isUp={false}
        />
        <StatCard
          title="Live Orders"
          value="84"
          icon={<Zap size={20} />}
          color="purple"
          trend="+18%"
          isUp={true}
        />
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-black text-gray-900 tracking-tight text-center">Revenue Growth</h2>
            <select className="bg-gray-50 border-gray-100 text-xs font-bold px-3 py-1.5 rounded-lg focus:ring-0 focus:border-gray-200">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1877F2" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#1877F2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#1877F2" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 font-bold">
          <h2 className="text-xl font-black text-gray-900 tracking-tight mb-8">Recent Activity</h2>
          <div className="space-y-6">
            <ActivityItem
              type="order"
              title="New Order Received"
              desc="Order #ORD-9872 from Burger King"
              time="2 mins ago"
            />
            <ActivityItem
              type="vendor"
              title="New Vendor Request"
              desc="Pizza Hut (Zone: Mumbai Central)"
              time="14 mins ago"
            />
            <ActivityItem
              type="rider"
              title="Rider Application"
              desc="Rahul Sharma (Zone: Bandra)"
              time="1 hour ago"
            />
            <ActivityItem
              type="alert"
              title="High Demand Alert"
              desc="Increased traffic in South Delhi"
              time="2 hours ago"
            />
          </div>
          <button className="w-full mt-8 py-3 border-2 border-gray-50 rounded-xl text-xs font-black text-blue-600 hover:bg-blue-50 transition-all uppercase tracking-widest">
            View All Logs
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color, trend, isUp }: any) {
  const colors: any = {
    blue: "bg-blue-600 shadow-blue-200",
    orange: "bg-orange-500 shadow-orange-200",
    green: "bg-green-500 shadow-green-200",
    purple: "bg-purple-600 shadow-purple-200"
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl shadow-lg text-white ${colors[color]}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-[10px] font-black uppercase px-2 py-1 rounded-lg ${isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{title}</p>
        <h3 className="text-2xl font-black text-gray-900 mt-1">{value}</h3>
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, type }: any) {
  const icons: any = {
    order: <ShoppingCart size={16} className="text-blue-600" />,
    vendor: <Store size={16} className="text-orange-500" />,
    rider: <Bike size={16} className="text-green-500" />,
    alert: <Zap size={16} className="text-purple-600" />
  };

  return (
    <div className="flex gap-4">
      <div className="mt-1">
        {icons[type]}
      </div>
      <div>
        <p className="text-sm font-black text-gray-900 leading-none">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{desc}</p>
        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{time}</p>
      </div>
    </div>
  );
}
