"use client";

import Link from "next/link";
import { useRef, useState } from "react";

const FEATURED_POST = {
    img: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=800",
    title: "From conversations to transformations",
    author: {
        name: "Nova Wren",
        avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100",
    },
    date: "May 18, 2025",
    href: "/blog/conversations-to-transformations",
};

const SMALL_POSTS = [
    {
        img: "https://images.pexels.com/photos/1181435/pexels-photo-1181435.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Real talk: consulting for real growth",
        author: {
            name: "Arlen Mendez",
            avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100",
        },
        date: "June 25, 2025",
        href: "/blog/consulting-for-real-growth",
    },
    {
        img: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=400",
        title: "Why modern businesses rely",
        author: {
            name: "Grace Ellis",
            avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100",
        },
        date: "June 18, 2025",
        href: "/blog/why-modern-businesses-rely",
    },
];

const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 2v4" /><path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" />
        <path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
    </svg>
);

export function BlogSection() {
    const imgRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [pos, setPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = imgRef.current?.getBoundingClientRect();
        if (!rect) return;
        setPos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <section className="w-max-8xl px-8 md:px-16 py-10 md:py-16">
            <div className="flex flex-col items-start justify-between mb-8 md:mb-16">
                <div
                    className="mb-4 flex items-center gap-2 text-xs font-medium text-zinc-300"
                    style={{ opacity: 0, animation: 'fadeUp 0.8s ease-out 0.2s forwards' }}
                >
                    <span
                        className="h-2 w-2 rounded-full bg-[#c5f018]"
                        style={{ animation: 'dotPulse 1s ease-in-out infinite' }}
                    />
                    <span className="text-sm md:text-lg">My Insights</span>
                </div>
                <div className="flex flex-row items-center justify-between w-full">
                    <h2 className="text-2xl md:text-6xl font-light text-white leading-tight">
                        Expert advisory{" "}
                        <span className="text-[#c5f018] font-semibold">updates</span>
                    </h2>
                    <Link
                        href="/myinsight"
                        className="shrink-0 inline-flex gap-2 items-center justify-center rounded-lg bg-[#c5f018] px-4 sm:px-6 py-3 sm:py-4 text-sm md:text-lg font-medium text-black transition duration-300 hover:border hover:border-white hover:text-[#c5f018] hover:bg-black"
                    >
                        View All
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* Featured post */}
            <Link href={FEATURED_POST.href} className="block group mb-4 border border-[#68800a] rounded-xl">
                <div className="relative flex flex-col md:flex-row rounded-xl overflow-hidden bg-zinc-900 transition-colors duration-300">
                    <div
                        ref={imgRef}
                        className="relative w-full md:w-[45%] shrink-0 overflow-hidden cursor-none"
                        onMouseMove={handleMouseMove}
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <img
                            src={FEATURED_POST.img}
                            alt={FEATURED_POST.title}
                            className="w-full h-56 md:h-120 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                        <div
                            className="absolute pointer-events-none top-0 left-0"
                            style={{
                                transform: `translate(${pos.x - 32}px, ${pos.y - 32}px)`,
                                opacity: hovered ? 1 : 0,
                                transition: 'opacity 0.3s ease, transform 0.06s linear',
                                willChange: 'transform',
                            }}
                        >
                            <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-black/40 backdrop-blur-sm">
                                <div className="absolute inset-0 rounded-full border-2 border-[#c5f018] shadow-[0_0_24px_6px_rgba(197,240,24,0.65)]" />
                                <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 13L13 3M13 3H5M13 3V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between p-6 md:p-8 flex-1">
                        <h3 className="text-2xl md:text-5xl font-light text-white leading-tight">
                            {FEATURED_POST.title}
                        </h3>
                        <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
                            <div className="flex items-center gap-3">
                                <img
                                    src={FEATURED_POST.author.avatar}
                                    alt={FEATURED_POST.author.name}
                                    className="w-12 h-12 rounded-lg object-cover shrink-0"
                                />
                                <span className="text-[#c5f018] font-light text-lg">{FEATURED_POST.author.name}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <CalendarIcon />
                                <span>{FEATURED_POST.date}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SMALL_POSTS.map((post, i) => (
                    <Link key={i} href={post.href} className="group block">
                        <div className="flex flex-row border border-[#68800a] rounded-xl overflow-hidden transition-colors duration-300 h-full">
                            <div className="relative w-36 md:w-75 md:h-70 shrink-0 overflow-hidden">
                                <img
                                    src={post.img}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            {/* Content */}
                            <div className="flex flex-col justify-between p-4 md:p-8 flex-1">
                                <h3 className="text-lg sm:text-2xl font-light text-white leading-snug">
                                    {post.title}
                                </h3>
                                <div className="mt-3">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            className="w-8 h-8 rounded-full object-cover shrink-0"
                                        />
                                        <span className="text-[#c5f018] text-sm font-light">{post.author.name}</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-4 text-sm">
                                        <CalendarIcon />
                                        <span>{post.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}