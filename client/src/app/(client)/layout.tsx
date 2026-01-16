"use client";
import React from "react";
import SearchBar from "@/components/layout/Searchbar/SearchBar";
import Link from 'next/link';
import MobileBottomNav from "@/components/common/MobileBottomNav";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-screen pb-20 md:pb-0">
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm px-4 h-16 md:h-20">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between gap-4">
          <Link href="/" className="font-black text-2xl tracking-tighter text-gray-900 border-b-4 border-primary">SHOPOD</Link>

          <div className="hidden md:flex items-center gap-1 font-black text-[10px] uppercase tracking-widest text-gray-400">
            <span className="text-primary text-xl">📍</span>
            <div className="flex flex-col">
              <span className="text-gray-900 leading-none">Home</span>
              <span className="truncate w-32 font-bold normal-case text-gray-400 mt-1">Mumbai, India...</span>
            </div>
          </div>

          <div className="flex-1 max-w-xl">
            <SearchBar />
          </div>

          <nav className="flex items-center gap-6">
            <Link href="/login" className="hidden lg:block font-black text-xs uppercase tracking-widest hover:text-primary transition-colors">SignIn</Link>
            <Link href="/cart" className="relative p-2 bg-primary/5 rounded-xl hover:bg-primary/10 transition-colors group">
              <span className="text-xl group-hover:scale-110 transition-transform inline-block">🛒</span>
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border-2 border-white">3</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="min-h-[calc(100vh-80px)]">
        {children}
      </main>

      <footer className="bg-gray-900 text-white pt-20 pb-10 px-8 mt-20 hidden md:block">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 text-sm font-bold text-gray-400 mb-16 uppercase tracking-widest">
          <div className="col-span-1 lg:col-span-2">
            <span className="font-black text-3xl tracking-tighter text-white block mb-6">SHOPOD</span>
            <p className="leading-relaxed normal-case w-64 text-xs">Fresh groceries and gourmet food delivered to your doorstep in minutes. Experience hyperlocal speed.</p>
          </div>
          <div>
            <h4 className="text-white mb-6 border-l-2 border-primary pl-4">Company</h4>
            <ul className="space-y-4 text-[10px]">
              <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/offers" className="hover:text-white transition-colors">Offers</Link></li>
            </ul>
          </div>
          {/* Add more footer columns as needed */}
        </div>
        <p className="text-center text-[10px] uppercase tracking-[1em] text-gray-700 font-black border-t border-gray-800 pt-10">&copy; 2026 Shopod Platform</p>
      </footer>

      <MobileBottomNav />
    </div>
  );
}
