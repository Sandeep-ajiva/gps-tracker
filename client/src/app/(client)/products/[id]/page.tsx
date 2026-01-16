"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProductDetailPage() {
    const { id } = useParams();

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-12">
                <div className="flex-1 aspect-square bg-gray-100 rounded-2xl" />
                <div className="flex-1">
                    <Link href="/products" className="text-primary font-bold text-sm mb-4 inline-block hover:underline">← Back to Products</Link>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">Product Detail {id}</h1>
                    <p className="text-gray-500 mb-6 font-medium text-lg">500g • Super Fresh</p>
                    <div className="flex items-end gap-3 mb-8">
                        <span className="text-4xl font-black">₹149</span>
                        <span className="text-gray-400 line-through text-xl font-bold">₹199</span>
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-black">25% OFF</span>
                    </div>
                    <button className="w-full md:w-64 bg-primary text-white font-black py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform">ADD TO CART</button>

                    <div className="mt-12 space-y-6">
                        <h3 className="font-black text-xl border-b pb-2">Product Information</h3>
                        <p className="text-gray-600 leading-relaxed font-medium">This is a detailed description placeholder for product {id}. Our items are sourced directly from farms ensuring maximum freshness and quality for our customers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
