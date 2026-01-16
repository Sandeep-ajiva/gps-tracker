"use client";
import Link from 'next/link';

export default function OffersPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-black mb-8">Exclusive Offers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-6 flex items-center justify-between group cursor-pointer hover:bg-primary/10 transition-colors">
                        <div>
                            <p className="text-xs font-black text-primary uppercase tracking-widest mb-1">Promo Code</p>
                            <h3 className="text-2xl font-black text-gray-900 tracking-tight">SAVE{i}0</h3>
                            <p className="text-sm font-bold text-gray-500 mt-1 italic">Flat {i}0% off up to ₹150 on first order</p>
                        </div>
                        <button className="px-5 py-2 bg-white text-primary rounded-xl font-black text-xs uppercase tracking-tighter shadow-sm group-hover:scale-110 transition-transform">Copy</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
