"use client";
import React, { useState, useEffect, Suspense } from "react";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [targetRole, setTargetRole] = useState(searchParams.get("role") || "admin");

    useEffect(() => {
        const role = searchParams.get("role");
        if (role) setTargetRole(role);
    }, [searchParams]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const result = await login(formData).unwrap();
            const role = (result as any).role || targetRole;

            dispatch(setUser({
                user: { email: formData.email },
                token: result.token,
                role: role as any
            }));

            toast.success("Login successful!");
            if (role === "admin" || role === "superadmin") router.push("/admin");
            else router.push("/");

        } catch (err: any) {
            toast.error(err?.data?.message || "Login failed. Please try again.");

            if (process.env.NODE_ENV === "development") {
                console.warn("Using mock login for development");
                const mockRole = formData.email.includes("admin") ? "admin" : "client";

                dispatch(setUser({
                    user: { email: formData.email },
                    token: "mock-token-" + Date.now(),
                    role: mockRole as any
                }));

                if (mockRole === "admin") router.push("/admin");
                else router.push("/");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-black">
                {/* Header Section */}
                <div className="bg-[#1877F2] p-8 text-center transition-colors duration-500">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Lock className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">GPS Tracker</h1>
                    <p className="text-white/90 text-sm mt-2">
                        {targetRole === "admin" ? "Admin Access" : "Secure Login"}
                    </p>
                </div>

                {/* Form Section */}
                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm text-black"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition text-sm text-black"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-current/10"
                        >
                            {isLoading ? (
                                <Loader2 size={20} className="animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Credentials Info */}
                    <div className="mt-8 pt-6 border-t border-gray-100">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center mb-4">System Access</p>
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                            <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Support Info</p>
                            <div className="space-y-2">
                                <p className="text-[11px] text-gray-600">
                                    Please use your registered administrator email to log in. Contact system support if you have trouble accessing your account.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-xs text-gray-400">
                        &copy; 2026 GPS Tracker. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function UnifiedLoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader2 className="animate-spin text-blue-500" size={32} />
            </div>
        }>
            <LoginForm />
        </Suspense>
    );
}

