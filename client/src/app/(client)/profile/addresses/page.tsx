"use client";
import Link from 'next/link';

export default function AddressesPage() {
    return (
        <div className="max-w-xl mx-auto px-4 py-8">
            <Link href="/profile" className="text-primary font-black text-sm mb-6 inline-block uppercase tracking-widest">← Back to Profile</Link>
            <h1 className="text-2xl font-black mb-8">Saved Addresses</h1>

            <div className="space-y-4">
                {[
                    { type: 'Home', addr: 'B-402, Sunshine Apartments, Link Road, Mumbai, 400053', isDefault: true },
                    { type: 'Work', addr: 'Tech Hub, 12th Floor, MG Road, Mumbai, 400001', isDefault: false },
                ].map((item) => (
                    <div key={item.type} className={`p-6 bg-white rounded-2xl border ${item.isDefault ? 'border-primary ring-2 ring-primary/10' : 'border-gray-100'} relative`}>
                        {item.isDefault && <span className="absolute -top-2 left-4 bg-primary text-white text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-lg">Default</span>}
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-black text-gray-800 text-lg uppercase tracking-tight">{item.type}</h3>
                            <div className="flex gap-3 text-xs font-black text-primary uppercase">
                                <button>Edit</button>
                                <button className="text-red-500">Delete</button>
                            </div>
                        </div>
                        <p className="text-sm font-bold text-gray-500 leading-relaxed pr-10">{item.addr}</p>
                    </div>
                ))}

                <button className="w-full border-2 border-dashed border-gray-200 p-6 rounded-2xl text-gray-400 font-black uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-all active:scale-95 leading-none mt-4">+ Add New Address</button>
            </div>
        </div>
    );
}
