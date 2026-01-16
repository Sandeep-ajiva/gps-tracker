"use client";
import React from "react";
import {
    Star,
    MessageCircle,
    ThumbsUp,
    Reply,
    MoreHorizontal,
    Search,
    Filter
} from "lucide-react";

const mockReviews = [
    {
        id: 1,
        customer: "Aman Gupta",
        rating: 5,
        comment: "The burgers were amazing! Still warm when delivered. Definitely ordering again.",
        date: "2 hours ago",
        orderId: "#ORD-9872",
        replied: false
    },
    {
        id: 2,
        customer: "Sneha Kapoor",
        rating: 4,
        comment: "Great taste but the fries were a bit soggy. Packaging could be improved.",
        date: "1 day ago",
        orderId: "#ORD-9865",
        replied: true,
        reply: "Hi Sneha, thanks for the feedback! We're working on better ventilation for our fry boxes. Hope to serve you better next time."
    },
    {
        id: 3,
        customer: "Rajesh Kumar",
        rating: 2,
        comment: "Order took too long to prepare. Burger was dry.",
        date: "2 days ago",
        orderId: "#ORD-9860",
        replied: false
    }
];

export default function ReviewsPage() {
    return (
        <div className="space-y-8 pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-secondary tracking-tight">Customer Reviews</h1>
                    <p className="text-secondary-light font-bold mt-1 text-sm">See what your customers are saying about your store.</p>
                </div>
                <div className="flex bg-white p-1 rounded-xl border border-gray-100 shadow-sm">
                    {["All", "Pending Reply", "Critical"].map((f) => (
                        <button
                            key={f}
                            className={`px-6 py-2.5 rounded-lg text-sm font-black transition-all ${f === 'All' ? "bg-secondary text-white" : "text-secondary-light hover:text-secondary"}`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card text-center flex flex-col items-center justify-center p-8 bg-primary text-white border-0 shadow-lg">
                    <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Average Rating</p>
                    <h3 className="text-5xl font-black flex items-center gap-3">4.2 <Star size={32} fill="white" /></h3>
                    <p className="text-[10px] font-bold uppercase mt-4 text-white/80">Based on 1,245 reviews</p>
                </div>

                <RatingStat stars={5} count={840} percentage={72} color="bg-success" />
                <RatingStat stars={4} count={210} percentage={18} color="bg-success/70" />
                <RatingStat stars={1} count={45} percentage={4} color="bg-error" />
            </div>

            <div className="space-y-6">
                {mockReviews.map((review) => (
                    <div key={review.id} className="card p-8 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-primary font-black text-xl">
                                    {review.customer.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-black text-secondary leading-none">{review.customer}</h4>
                                    <p className="text-[10px] font-bold text-secondary-light uppercase mt-1 tracking-tighter">Order {review.orderId} • {review.date}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        fill={i < review.rating ? "#FF5200" : "transparent"}
                                        className={i < review.rating ? "text-primary" : "text-gray-300"}
                                    />
                                ))}
                                <span className="text-xs font-black text-secondary ml-1">{review.rating}.0</span>
                            </div>
                        </div>

                        <p className="text-secondary font-bold text-sm leading-relaxed mb-6">"{review.comment}"</p>

                        {review.replied ? (
                            <div className="bg-gray-50 border-l-4 border-primary p-6 rounded-r-xl relative overflow-hidden">
                                <div className="flex items-center gap-2 mb-2">
                                    <Reply size={16} className="text-primary" />
                                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest">Your Response</span>
                                </div>
                                <p className="text-sm font-bold text-secondary-light">{review.reply}</p>
                            </div>
                        ) : (
                            <div className="flex gap-3">
                                <button className="flex-1 py-3 border-2 border-gray-100 rounded-xl font-black text-sm text-secondary hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2">
                                    <Reply size={18} /> REPLY TO CUSTOMER
                                </button>
                                <button className="px-5 py-3 border-2 border-gray-100 rounded-xl text-secondary-light hover:text-secondary hover:border-gray-300 transition-all">
                                    <ThumbsUp size={18} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function RatingStat({ stars, count, percentage, color }: any) {
    return (
        <div className="card flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 font-black text-sm">
                    {stars} <Star size={14} fill="#282C3F" className="text-secondary" />
                </div>
                <span className="text-xs font-bold text-secondary-light">{count}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${percentage}%` }} />
            </div>
            <p className="text-[10px] font-bold text-secondary-light mt-2 uppercase tracking-tighter text-right">{percentage}% of total</p>
        </div>
    );
}
