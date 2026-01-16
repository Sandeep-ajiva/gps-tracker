"use client";
import Link from 'next/link';

export default function OrdersPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-black mb-8">My Orders</h1>
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start border-b pb-4 mb-4">
                            <div>
                                <h3 className="font-black text-gray-800">Order #SH-40092{i}</h3>
                                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">Oct 24, 2023 • 12:45 PM</p>
                            </div>
                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">Delivered</span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 shadow-sm" />
                                ))}
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-none">Total Amount</p>
                                <p className="text-xl font-black text-gray-900 mt-1">₹499</p>
                            </div>
                        </div>
                        <Link href={`/orders/${i}`} className="block w-full text-center mt-6 py-3 border-2 border-gray-50 rounded-xl font-black text-xs text-primary uppercase tracking-widest hover:bg-gray-50 transition-colors">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
