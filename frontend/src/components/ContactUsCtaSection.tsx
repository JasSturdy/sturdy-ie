"use client"
import type { CtaData } from '@/lib/cta';
import { motion, useInView } from 'motion/react';
import Link from 'next/link';
import { useRef } from 'react';

const CARD_STYLES = [
    {
        imgWidth: 'w-28 md:w-44 lg:w-55',
        imgHeight: 'h-40 md:h-60 lg:h-80',
        objectFit: 'object-cover object-top',
        animClass: 'animate-fan-left',
        overlap: '-mr-4 sm:-mr-8 md:-mr-12',
    },
    {
        imgWidth: 'w-36 md:w-56 lg:w-70',
        imgHeight: 'h-52 md:h-72 lg:h-100',
        objectFit: 'object-cover object-center',
        animClass: 'animate-fan-center',
        overlap: 'z-10 -mx-2 sm:-mx-4 md:-mx-6',
    },
    {
        imgWidth: 'w-28 md:w-44 lg:w-55',
        imgHeight: 'h-40 md:h-60 lg:h-80',
        objectFit: 'object-cover object-top',
        animClass: 'animate-fan-right',
        overlap: '-ml-4 sm:-ml-8 md:-ml-12',
    },
];

const FALLBACK: CtaData = {
    headingStart:  'Building',
    headingMiddle: 'Trusted Systems',
    headingEnd:    'for Regulated Environments',
    subheading:    'Where policy, infrastructure, and data must work in practice',
    buttonLabel:   'Explore My Work',
    buttonHref:    '/case-studies',
    cards: [
        { imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80', alt: 'Data analytics and metrics' },
        { imageUrl: '/profile-security-digital-lock.png', alt: 'Digital security and trusted systems' },
        { imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&auto=format&fit=crop&q=80', alt: 'Governance and institutional collaboration' },
    ],
};

export function ContactUsCtaSection({ data }: { data?: CtaData | null }) {
    const d = data ?? FALLBACK;
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: '0px 0px -60px 0px' });

    return (
        <section className="max-w-8xl mx-auto relative w-full px-4 sm:px-8 md:px-14 py-20">
            <div
                className="relative overflow-hidden rounded-xl border border-zinc-600 pb-0 pt-10 sm:pt-16 md:pt-24"
                style={{
                    background: 'linear-gradient(to bottom, #000000 0%, rgba(34, 56, 8, 0.95) 60%, rgba(116, 181, 19, 0.9) 100%)',
                }}
            >
                <div ref={headerRef} className="relative px-4 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 24 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-auto max-w-3xl text-2xl font-light leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
                    >
                        {d.headingStart}{' '}
                        <span className="font-bold text-[#c5f018]">{d.headingMiddle}{' '}</span>
                        <span className="text-white">{d.headingEnd}</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                        className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-white sm:text-base md:text-lg"
                    >
                        {d.subheading}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={headerInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        className="mt-8 inline-block sm:mt-10"
                    >
                        <Link
                            href={d.buttonHref}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c5f018] px-6 py-3 text-sm font-medium text-black transition duration-300 hover:border hover:border-white hover:bg-black hover:text-[#c5f018] sm:px-10 sm:py-4 sm:text-lg md:text-xl"
                        >
                            {d.buttonLabel}
                            <svg width="20" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M3 13L13 3M13 3H5M13 3V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </motion.div>

                    <div className="relative mt-12 sm:mt-16 md:mt-20">
                        {/* animated line — unchanged */}
                        <div className="absolute bottom-4 left-0 right-0 z-0 flex items-center px-2 sm:bottom-6 sm:px-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center sm:h-12 sm:w-16" style={{ opacity: 0, animation: 'fade-in-star-left 4s ease-out infinite' }}>
                                <div className="relative flex h-5 w-5 items-center justify-center sm:h-8 sm:w-8">
                                    <span className="absolute h-[2px] w-full bg-[#c5f018] sm:h-[3px]" />
                                    <span className="absolute h-[2px] w-full rotate-60 bg-[#c5f018] sm:h-[3px]" />
                                    <span className="absolute h-[2px] w-full -rotate-60 bg-[#c5f018] sm:h-[3px]" />
                                </div>
                            </div>
                            <div className="h-[0.5px] flex-1 origin-left bg-white" style={{ opacity: 0, transform: 'scaleX(0)', animation: 'slide-in-line 4s ease-out infinite' }} />
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center sm:h-12 sm:w-16" style={{ opacity: 0, animation: 'fade-in-star-right 4s ease-out infinite' }}>
                                <div className="relative flex h-5 w-5 items-center justify-center sm:h-8 sm:w-8">
                                    <span className="absolute h-[2px] w-full bg-[#c5f018] sm:h-[3px]" />
                                    <span className="absolute h-[2px] w-full rotate-60 bg-[#c5f018] sm:h-[3px]" />
                                    <span className="absolute h-[2px] w-full -rotate-60 bg-[#c5f018] sm:h-[3px]" />
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 flex flex-row items-end justify-center overflow-visible">
                            {d.cards.map((card, i) => {
                                const style = CARD_STYLES[i];
                                return (
                                    <div
                                        key={card.alt || i}
                                        className={`relative flex shrink-0 flex-col ${style.overlap} ${i === 1 ? 'scale-110' : 'scale-100'} ${style.animClass}`}
                                    >
                                        <div className="overflow-hidden rounded-xl md:rounded-2xl" style={{ lineHeight: 0, fontSize: 0 }}>
                                            {card.imageUrl ? (
                                                <img
                                                    src={card.imageUrl}
                                                    alt={card.alt}
                                                    className={`block ${style.objectFit} ${style.imgWidth} ${style.imgHeight}`}
                                                />
                                            ) : (
                                                <div className={`block bg-zinc-900 ${style.imgWidth} ${style.imgHeight}`} />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}