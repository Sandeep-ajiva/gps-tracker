"use client";
import React, { useState, useEffect } from "react";
import { Lock, Mail, Loader2, ArrowRight, Shield, ShoppingBag, User } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

export default function UnifiedLoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [targetRole, setTargetRole] = useState(searchParams.get("role") || "client");

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
            // In a real app, this would be a real API call
            // For now, let's simulate role-based login logic
            // In production, the backend might return the role in the JWT or response

            // Mocking the API response based on specific emails for demo/dev purposes
            // Or just allow any login for now and assign role based on targetRole

            const result = await login(formData).unwrap();

            // Assume the backend returns role, if not we use targetRole for now
            const role = (result as any).role || targetRole;

            dispatch(setUser({
                user: { email: formData.email },
                token: result.token,
                role: role as any
            }));

            toast.success("Login successful!");

            // Redirect based on role
            if (role === "admin") router.push("/admin");
            else if (role === "seller") router.push("/seller");
            else router.push("/");

        } catch (err: any) {
            toast.error(err?.data?.message || "Login failed. Please try again.");

            // Fallback mock for development if API is not ready
            if (process.env.NODE_ENV === "development") {
                console.warn("Using mock login for development");
                const mockRole = formData.email.includes("admin") ? "admin" : (formData.email.includes("seller") ? "seller" : "client");

                dispatch(setUser({
                    user: { email: formData.email },
                    token: "mock-token-" + Date.now(),
                    role: mockRole as any
                }));

                if (mockRole === "admin") router.push("/admin");
                else if (mockRole === "seller") router.push("/seller");
                else router.push("/");
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-black">
                {/* Header Section */}
                <div className={`${targetRole === 'seller' ? 'bg-primary' : 'bg-[#1877F2]'} p-8 text-center transition-colors duration-500`}>
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                        <Lock className="text-white" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Shopod</h1>
                    <p className="text-white/90 text-sm mt-2">
                        {targetRole === "admin" ? "Admin Access" : (targetRole === "seller" ? "Seller Partner" : "Welcome Back")}
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
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${targetRole === 'seller' ? 'focus:ring-primary/20 focus:border-primary' : 'focus:ring-blue-500/20 focus:border-blue-500'} outline-none transition text-sm text-black`}
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
                                    className={`w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${targetRole === 'seller' ? 'focus:ring-primary/20 focus:border-primary' : 'focus:ring-blue-500/20 focus:border-blue-500'} outline-none transition text-sm text-black`}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full ${targetRole === 'seller' ? 'bg-primary hover:bg-primary-dark' : 'bg-[#1877F2] hover:bg-blue-600'} text-white font-bold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group shadow-lg shadow-current/10`}
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

                    {/* Development Role Switcher & Credentials */}
                    {process.env.NODE_ENV === "development" && (
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center mb-4">Development Environment</p>
                            <div className="flex gap-2 mb-6">
                                {[
                                    { id: 'admin', icon: Shield, label: 'Admin', color: 'bg-red-50 text-red-600 border-red-100' },
                                    { id: 'seller', icon: ShoppingBag, label: 'Seller', color: 'bg-orange-50 text-orange-600 border-orange-100' },
                                    { id: 'client', icon: User, label: 'Client', color: 'bg-blue-50 text-blue-600 border-blue-100' }
                                ].map((role) => (
                                    <button
                                        key={role.id}
                                        type="button"
                                        onClick={() => setTargetRole(role.id)}
                                        className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl border-2 transition-all ${targetRole === role.id ? role.color + ' border-current scale-105' : 'bg-gray-50 text-gray-400 border-transparent hover:bg-gray-100'}`}
                                    >
                                        <role.icon size={16} />
                                        <span className="text-[10px] font-bold">{role.label}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-2">Test Credentials</p>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="font-bold text-gray-600">Admin:</span>
                                        <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-red-600">admin@shopod.com / admin123</code>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="font-bold text-gray-600">Seller:</span>
                                        <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-orange-600">seller@shopod.com / seller123</code>
                                    </div>
                                    <div className="flex justify-between items-center text-[11px]">
                                        <span className="font-bold text-gray-600">User:</span>
                                        <code className="bg-white px-1.5 py-0.5 rounded border border-gray-200 text-blue-600">user@shopod.com / user123</code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 text-center text-xs text-gray-400">
                        &copy; 2026 Shopod Inc. All rights reserved.
                    </div>
                </div>
            </div>
        </div>
    );
}
