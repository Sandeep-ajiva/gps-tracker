"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HeroSlider from "@/components/home/Banner/HeroSlider";
import AllCategories from "@/components/home/Category/AllCategories";
import FoodCategorySlider from "@/components/home/Food/FoodCategorySlider";
import BenefitBar from "@/components/home/Features/BenefitBar";
import Modal from "@/components/ui/Modal";

export default function HomePage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    const token = localStorage.getItem("token");

    if (token && userRole === "admin") {
      router.push("/admin");
    } else if (token && userRole === "seller") {
      router.push("/seller");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* 🔥 Pass callback */}
      <HeroSlider onShopNowClick={() => setOpen(true)} />

      <AllCategories />
      <FoodCategorySlider />
      <BenefitBar />

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Shopod Offer"
        position="center"
        size="md"
      >
        <p className="text-gray-700">
          Welcome to Shopod 🎉
        </p>
      </Modal>
    </div>
  );
}
