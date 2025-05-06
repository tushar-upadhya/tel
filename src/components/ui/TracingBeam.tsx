"use client"; // Required for Next.js client-side components

import { cn } from "@/lib/utils"; // Utility for className merging (from Aceternity)
import { motion, useScroll, useSpring, useTransform } from "framer-motion"; // Use framer-motion for older versions
import { useEffect, useRef, useState } from "react";

interface TracingBeamProps {
    className?: string;
}

const TracingBeam: React.FC<TracingBeamProps> = ({ className }) => {
    const ref = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [svgHeight, setSvgHeight] = useState<number>(0);

    // Calculate SVG height dynamically
    useEffect(() => {
        if (contentRef.current) {
            const updateHeight = () => {
                setSvgHeight(contentRef.current!.offsetHeight);
            };
            updateHeight();
            window.addEventListener("resize", updateHeight);
            return () => window.removeEventListener("resize", updateHeight);
        }
    }, []);

    // Scroll tracking
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end end"],
    });

    // Smooth gradient animation
    const y1 = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, svgHeight]),
        {
            stiffness: 500,
            damping: 90,
        }
    );
    const y2 = useSpring(
        useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]),
        {
            stiffness: 500,
            damping: 90,
        }
    );

    return (
        <motion.div
            ref={ref}
            className={cn("absolute left-0 top-0 h-full w-4 z-10", className)}
        >
            <svg
                viewBox={`0 0 10 ${svgHeight}`}
                width="10"
                height={svgHeight}
                className="block"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <motion.path
                    d={`M 5 0 V ${svgHeight}`}
                    fill="none"
                    stroke="#e5e7eb"
                    strokeOpacity="0.2"
                    strokeWidth="1"
                />
                <motion.path
                    d={`M 5 0 V ${svgHeight}`}
                    fill="none"
                    stroke="url(#beamGradient)"
                    strokeWidth="2"
                    className="motion-reduce:block"
                />
                <defs>
                    <motion.linearGradient
                        id="beamGradient"
                        x1="0%"
                        y1={y1}
                        x2="0%"
                        y2={y2}
                    >
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0)" />
                        <stop
                            offset="50%"
                            stopColor="rgba(59, 130, 246, 0.8)"
                        />
                        <stop offset="100%" stopColor="rgba(59, 130, 246, 0)" />
                    </motion.linearGradient>
                </defs>
            </svg>
        </motion.div>
    );
};

export default TracingBeam;
