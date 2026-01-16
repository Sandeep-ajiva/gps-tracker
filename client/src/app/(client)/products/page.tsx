"use client";
import Link from 'next/link';

export default function ProductsPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">All Products</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                    <Link href={`/products/${i}`} key={i} className="group">
                        <div className="aspect-square bg-gray-100 rounded-xl mb-3 overflow-hidden" />
                        <h3 className="font-bold text-gray-800">Product Name {i}</h3>
                        <p className="text-sm text-gray-500">250g</p>
                        <div className="flex items-center justify-between mt-2">
                            <span className="font-black text-lg">₹99</span>
                            <button className="px-4 py-1.5 border-2 border-primary text-primary font-black rounded-lg text-xs uppercase hover:bg-primary hover:text-white transition-colors">Add</button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
