"use client";
import Link from 'next/link';

export default function VerifyOtpPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-[40px] shadow-2xl p-12 text-center">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-8">📱</div>
                <h1 className="text-3xl font-black tracking-tight mb-2">Verify OTP</h1>
                <p className="text-gray-400 font-bold text-sm mb-10 leading-relaxed uppercase tracking-widest">We've sent a 4-digit code to <br /><span className="text-gray-900">+91 98765 43210</span></p>

                <div className="flex justify-center gap-4 mb-10">
                    {[1, 2, 3, 4].map((i) => (
                        <input key={i} className="w-14 h-14 text-center text-2xl font-black bg-gray-50 border-2 border-transparent rounded-2xl focus:border-primary focus:bg-white outline-none transition-all shadow-sm" maxLength={1} />
                    ))}
                </div>

                <Link href="/" className="block w-full bg-primary text-white font-black py-4 rounded-2xl shadow-lg shadow-primary/20 uppercase tracking-widest text-xs tracking-tighter">Confirm & Continue</Link>

                <button className="mt-8 text-xs font-black text-gray-400 hover:text-primary transition-colors uppercase tracking-widest">Resend OTP in 30s</button>
            </div>
        </div>
    );
}
