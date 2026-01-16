"use client";
import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Plus, Edit2 } from "lucide-react";

export default function CustomersPage() {
    const customers = [
        { id: 1, name: "Liam Johnson", email: "liam@example.com", phone: "+1 234 567 890", orders: 12, spent: "$1,240" },
        { id: 2, name: "Olivia Smith", email: "olivia@example.com", phone: "+1 987 654 321", orders: 5, spent: "$450" },
        { id: 3, name: "Noah Williams", email: "noah@example.com", phone: "+1 555 123 456", orders: 24, spent: "$3,890" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
                <Link href="/admin/customers/add" className="flex items-center gap-2 bg-[#1877F2] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition text-sm font-medium">
                    <Plus size={18} /> Add Customer
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer) => (
                    <div key={customer.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                                {customer.name.charAt(0)}
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800">{customer.name}</h3>
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-gray-500">Customer ID: #{customer.id}</p>
                                    <Link href={`/customers/edit/${customer.id}`} className="text-blue-600 hover:text-blue-800">
                                        <Edit2 size={12} />
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Mail size={16} className="text-gray-400" />
                                <span>{customer.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={16} className="text-gray-400" />
                                <span>{customer.phone}</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg mt-auto">
                            <div className="text-center">
                                <p className="text-xs text-gray-500">Orders</p>
                                <p className="font-bold text-gray-800">{customer.orders}</p>
                            </div>
                            <div className="h-8 w-px bg-gray-200"></div>
                            <div className="text-center">
                                <p className="text-xs text-gray-500">Total Spent</p>
                                <p className="font-bold text-green-600">{customer.spent}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
