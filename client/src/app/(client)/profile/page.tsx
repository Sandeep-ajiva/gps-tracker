"use client";
import Link from 'next/link';

export default function ProfilePage() {
    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-4 border-4 border-white shadow-xl">JD</div>
                <h1 className="text-2xl font-black tracking-tight">John Doe</h1>
                <p className="text-sm font-bold text-gray-400 mt-1 uppercase tracking-widest">john@example.com • 9876543210</p>
            </div>

            <div className="space-y-3">
                {[
                    { label: 'My Orders', href: '/orders', icon: '📦' },
                    { label: 'Manage Addresses', href: '/profile/addresses', icon: '🏠' },
                    { label: 'Offers & Coupons', href: '/offers', icon: '🏷️' },
                    { label: 'Customer Support', href: '/help', icon: '🎧' },
                ].map((item) => (
                    <Link key={item.label} href={item.href} className="flex items-center justify-between p-5 bg-white rounded-2xl border border-gray-100 hover:shadow-md transition-all group active:scale-95">
                        <div className="flex items-center gap-4">
                            <span className="text-2xl">{item.icon}</span>
                            <span className="font-black text-gray-800 group-hover:text-primary transition-colors">{item.label}</span>
                        </div>
                        <span className="text-gray-300">→</span>
                    </Link>
                ))}

                <button className="w-full text-center p-5 font-black text-red-500 uppercase tracking-widest text-xs mt-8">Logout</button>
            </div>
        </div>
    );
}
