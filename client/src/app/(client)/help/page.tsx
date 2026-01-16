"use client";
import Link from 'next/link';

export default function HelpPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-black mb-8">How can we help?</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {[
                    { title: 'My Account', desc: 'Manage your profile and settings', icon: '👤' },
                    { title: 'Payments', desc: 'FAQs related to transactions', icon: '💳' },
                    { title: 'Orders', desc: 'Track or cancel your orders', icon: '📦' },
                ].map((item) => (
                    <div key={item.title} className="bg-white p-8 rounded-3xl border border-gray-100 text-center shadow-sm hover:shadow-xl transition-all cursor-pointer group">
                        <div className="text-4xl mb-4 group-hover:scale-125 transition-transform inline-block">{item.icon}</div>
                        <h3 className="font-black text-gray-800 mb-2">{item.title}</h3>
                        <p className="text-xs font-bold text-gray-400 leading-relaxed uppercase tracking-widest">{item.desc}</p>
                    </div>
                ))}
            </div>

            <div className="bg-primary text-white p-8 rounded-[40px] shadow-2xl shadow-primary/40 flex flex-col items-center text-center">
                <h2 className="text-3xl font-black tracking-tight mb-2">Need real-time support?</h2>
                <p className="text-white/80 font-bold mb-6 italic">Our 24/7 chat support team is here to solve any issues!</p>
                <button className="bg-white text-primary px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-[1.05] transition-transform">Start Live Chat</button>
            </div>
        </div>
    );
}
