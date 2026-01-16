"use client";
import React from "react";
import AuthGuard from "@/components/seller/Auth/AuthGuard";
import Sidebar from "@/components/seller/Layout/Sidebar";
import Header from "@/components/seller/Layout/Header";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex">
                <Sidebar />
                <div className="flex-1 ml-64 min-h-screen">
                    <Header />
                    <main className="p-8">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
