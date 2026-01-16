"use client";
import Link from 'next/link';

export default function CheckoutPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
            <div className="flex-[2] space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <h2 className="text-lg font-black mb-4 uppercase tracking-wider text-gray-400">1. Delivery Address</h2>
                    <div className="border-2 border-primary/50 bg-primary/5 p-4 rounded-xl">
                        <h3 className="font-bold text-gray-800 mb-1">Home</h3>
                        <p className="text-sm text-gray-500 font-medium">B-402, Sunshine Apartments, Link Road, Mumbai, 400053</p>
                    </div>
                    <button className="mt-4 text-primary font-black text-sm uppercase">+ Add New Address</button>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 opacity-60">
                    <h2 className="text-lg font-black mb-4 uppercase tracking-wider text-gray-400">2. Payment Method</h2>
                    <p className="text-sm font-medium text-gray-500 italic">Select address to continue...</p>
                </div>
            </div>

            <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-8">
                    <h2 className="font-black text-lg mb-6">Order Summary</h2>
                    <div className="space-y-4 pb-6 border-b mb-6">
                        <div className="flex justify-between text-sm font-bold text-gray-500">
                            <span>Subtotal</span>
                            <span>₹147</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-gray-500">
                            <span>Handling Fee</span>
                            <span>₹2</span>
                        </div>
                    </div>
                    <div className="flex justify-between font-black text-2xl mb-8">
                        <span>Total</span>
                        <span>₹149</span>
                    </div>
                    <Link href="/orders/1" className="block w-full bg-primary text-white text-center font-black py-4 rounded-xl shadow-lg shadow-primary/20 transition-transform active:scale-95">PLACE ORDER</Link>
                </div>
            </div>
        </div>
    );
}
