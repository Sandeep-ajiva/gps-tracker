"use client";
import Link from 'next/link';

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl p-10">
                <h1 className="text-3xl font-black tracking-tight mb-2">Create Account</h1>
                <p className="text-gray-400 font-bold text-sm uppercase mb-8 tracking-widest">Sign up to start shopping</p>

                <form className="space-y-4">
                    <input className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Full Name" />
                    <input className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Mobile Number" />
                    <input className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" placeholder="Email (Optional)" />

                    <Link href="/verify-otp" className="block w-full bg-primary text-white text-center font-black py-4 rounded-2xl shadow-lg shadow-primary/20 mt-8 transition-transform active:scale-95 uppercase tracking-widest text-xs">Continue</Link>
                </form>

                <p className="text-center mt-8 text-gray-400 font-bold text-sm uppercase tracking-widest">
                    Already have an account? <Link href="/login" className="text-primary font-black ml-1">Login</Link>
                </p>
            </div>
        </div>
    );
}
