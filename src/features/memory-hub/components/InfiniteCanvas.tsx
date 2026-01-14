
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { Post } from "../types";
import { FlipCard } from "./FlipCard";

interface InfiniteCanvasProps {
    posts: Post[];
}

export function InfiniteCanvas({ posts }: InfiniteCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const [isIdle, setIsIdle] = useState(true);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Configuration
    const AUTO_PAN_SPEED = 0.5; // Pixels per frame approx
    const IDLE_TIMEOUT = 3000; // ms before resuming auto-pan

    useEffect(() => {
        let animationFrameId: number;

        const autoPan = () => {
            if (isIdle) {
                // Slowly move diagonally or horizontally
                // For simplicity, let's just move everything slowly left
                const currentX = x.get();
                x.set(currentX - AUTO_PAN_SPEED);

                // Loop logic: if we go too far, reset?
                // True infinite canvas requires tiling or complex virtualization.
                // For this prototype, we'll just bounce or rely on a large area.
            }
            animationFrameId = requestAnimationFrame(autoPan);
        };

        if (isIdle) {
            animationFrameId = requestAnimationFrame(autoPan);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isIdle, x]);

    const handleInteractionStart = () => {
        setIsIdle(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };

    const handleInteractionEnd = () => {
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, IDLE_TIMEOUT);
    };

    // Generate random positions for a "scattered" look
    // Ideally this should be stable (memoized)
    const positions = posts.map((_, i) => {


        // Simple grid-ish distribution with noise
        const col = i % 5;
        const row = Math.floor(i / 5);

        return {
            left: col * 300 + Math.random() * 50,
            top: row * 350 + Math.random() * 50,
            rotate: (Math.random() - 0.5) * 10,
        };
    });

    return (
        <div
            ref={containerRef}
            className="w-full h-[80vh] overflow-hidden bg-gray-50 relative cursor-grab active:cursor-grabbing border border-gray-200 rounded-xl"
            onPointerDown={handleInteractionStart}
            onPointerUp={handleInteractionEnd}
            onPointerLeave={handleInteractionEnd}
        >
            <motion.div
                drag
                dragConstraints={containerRef} // Loose, or calc boundaries
                dragElastic={0.1}
                style={{ x, y }}
                className="absolute top-0 left-0 w-[2000px] h-[2000px] origin-top-left" // Large canvas
            >
                <div className="relative w-full h-full">
                    {posts.map((post, index) => (
                        <FlipCard
                            key={post.id}
                            post={post}
                            style={{
                                position: "absolute",
                                left: positions[index].left,
                                top: positions[index].top,
                                transform: `rotate(${positions[index].rotate}deg)`,
                                zIndex: 1 // Naive z-index
                            }}
                            onFlip={(flipped) => {
                                // Keep idle false while reading back
                                if (flipped) handleInteractionStart();
                                else handleInteractionEnd();
                            }}
                        />
                    ))}

                    {/* Background elements/doodles for "memory" vibe */}
                    <div className="absolute top-20 left-20 opacity-10 pointer-events-none font-handwriting text-9xl -rotate-12">
                        2024
                    </div>
                    <div className="absolute bottom-40 right-40 opacity-10 pointer-events-none font-handwriting text-9xl rotate-6">
                        Memories
                    </div>
                </div>
            </motion.div>

            {/* UI overlay for hints */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-sm text-gray-500 pointer-events-none">
                {isIdle ? "Auto-playing... Drag to explore" : "Interactive Mode"}
            </div>
        </div>
    );
}
