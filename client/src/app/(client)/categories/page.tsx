"use client";
import Link from 'next/link';

export default function CategoriesPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Explore Categories</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                    <Link href={`/categories/${i}`} key={i} className="p-4 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-shadow text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-3" />
                        <span className="font-semibold text-sm">Category {i}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}
