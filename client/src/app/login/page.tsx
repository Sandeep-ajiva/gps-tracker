"use client";

import React, { useState, Suspense } from "react";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/features/userSlice";
import { useLoginMutation } from "@/redux/api/authApi";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await login(formData).unwrap();

      if (!result?.user || !result?.token) {
        toast.error("Invalid login response");
        return;
      }

      if (result.user.role !== "superadmin" && result.user.role !== "admin") {
        toast.error("You are not allowed to access admin panel");
        return;
      }

      // ✅ SAVE TO LOCALSTORAGE (AuthGuard depends on this)
      localStorage.setItem("token", result.token);
      localStorage.setItem("userRole", result.user.role);

      // ✅ SAVE TO REDUX (UI state)
      dispatch(
        setUser({
          user: result.user,
          token: result.token,
          role: result.user.role,
        })
      );

      toast.success("Login successful");

      // ✅ ALWAYS REDIRECT TO ADMIN (Dashboard for superadmins)
      router.push("/admin");

    } catch (err: any) {
      toast.error(err?.data?.message || "Invalid email or password");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden text-black">
        {/* Header */}
        <div className="bg-[#1877F2] p-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="text-white" size={32} />
          </div>
          <h1 className="text-2xl font-bold text-white">GPS Tracker</h1>
          <p className="text-white/90 text-sm mt-2">
            Admin / Super Admin Login
          </p>
        </div>

        {/* Form */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#1877F2] hover:bg-blue-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-400">
            &copy; 2026 GPS Tracker. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <Loader2 className="animate-spin text-blue-500" size={32} />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
