"use client";
import Link from 'next/link';

export default function CartPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-black mb-8">Your Cart (3 Items)</h1>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-6 border-b border-gray-50 last:border-none">
                        <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0" />
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800">Fresh Item {i}</h3>
                            <p className="text-sm text-gray-500 font-medium">Pack of 1</p>
                            <div className="flex items-center justify-between mt-3">
                                <span className="font-black">₹49</span>
                                <div className="flex items-center border-2 border-primary rounded-lg">
                                    <button className="px-3 py-1 text-primary font-black hover:bg-primary/5 transition-colors">-</button>
                                    <span className="px-2 font-black text-sm">1</span>
                                    <button className="px-3 py-1 text-primary font-black hover:bg-primary/5 transition-colors">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
                <div className="flex justify-between font-bold text-sm text-gray-500">
                    <span>Item Total</span>
                    <span>₹147</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-gray-500">
                    <span>Delivery Charge</span>
                    <span className="text-primary uppercase">Free</span>
                </div>
                <div className="flex justify-between font-black text-xl pt-4 border-t">
                    <span>Grand Total</span>
                    <span>₹147</span>
                </div>
                <Link href="/checkout" className="block w-full bg-primary text-white text-center font-black py-4 rounded-xl shadow-lg shadow-primary/20 mt-6 hover:scale-[0.99] transition-transform">PROCEED TO CHECKOUT</Link>
            </div>
        </div>
    );
}
