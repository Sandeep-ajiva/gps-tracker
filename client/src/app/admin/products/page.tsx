"use client";
import React from "react";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";

export default function ProductsPage() {
    const products = [
        { id: 1, name: "Organic Bananas", category: "Fruits", price: "$4.99", stock: 120, status: "Active" },
        { id: 2, name: "Whole Milk", category: "Dairy", price: "$3.49", stock: 45, status: "Active" },
        { id: 3, name: "Sourdough Bread", category: "Bakery", price: "$5.99", stock: 0, status: "Out of Stock" },
        { id: 4, name: "Chicken Breast", category: "Meat", price: "$12.99", stock: 30, status: "Active" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <Link href="/admin/products/add" className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
                    <Plus size={18} /> Add Product
                </Link>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-sm text-left">
                    <thead className="bg-[#F9FAFB] text-gray-600 font-medium border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3">Product Name</th>
                            <th className="px-6 py-3">Category</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">Stock</th>
                            <th className="px-6 py-3">Status</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-800">{product.name}</td>
                                <td className="px-6 py-4 text-gray-500">{product.category}</td>
                                <td className="px-6 py-4 text-gray-800 font-semibold">{product.price}</td>
                                <td className="px-6 py-4 text-gray-500">{product.stock}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        }`}>
                                        {product.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/products/edit/${product.id}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition">
                                            <Edit2 size={16} />
                                        </Link>
                                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
