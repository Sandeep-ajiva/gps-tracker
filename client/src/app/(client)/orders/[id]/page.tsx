"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function OrderDetailPage() {
    const { id } = useParams();

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Link href="/orders" className="text-primary font-black text-sm mb-6 inline-block uppercase tracking-widest">← Back to Orders</Link>

            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                <div className="bg-gray-50 p-8 border-b border-gray-100">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-black tracking-tight">Order #{id}9827</h1>
                        <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">Out for Delivery</span>
                    </div>
                    <p className="text-sm font-bold text-gray-400 mt-2 uppercase tracking-widest">Estimated Arrival: 15-20 Mins</p>
                </div>

                <div className="p-8 space-y-8">
                    <section>
                        <h3 className="font-black text-xs uppercase text-gray-400 tracking-widest mb-4">Items Ordered</h3>
                        <div className="space-y-4">
                            {[1, 2].map((i) => (
                                <div key={i} className="flex justify-between font-bold">
                                    <div className="flex gap-2">
                                        <span className="text-gray-400">{i}x</span>
                                        <span className="text-gray-800 font-black">Organic Banana (6 pcs)</span>
                                    </div>
                                    <span className="font-black">₹{i * 45}</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="bg-gray-50 p-6 rounded-2xl">
                        <h3 className="font-black text-xs uppercase text-gray-400 tracking-widest mb-3">Delivery Address</h3>
                        <p className="text-sm font-black text-gray-700">Home • Mumbai</p>
                        <p className="text-sm font-bold text-gray-400 mt-1">B-402, Sunshine Apartments, Link Road, Mumbai, 400053</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
