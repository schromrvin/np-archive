
import { useRef, useEffect, useState, useMemo } from "react";
import { motion, useMotionValue } from "framer-motion";
import type { Post } from "../types";
import { FlipCard } from "./FlipCard";

interface InfiniteCanvasProps {
    posts: Post[];
}

export function InfiniteCanvas({ posts }: InfiniteCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0); // Y is just for free drag, we won't loop Y for now or restrict it

    const [isIdle, setIsIdle] = useState(true);
    const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Configuration
    const COLUMNS = 6;
    const COLUMN_WIDTH = 320; // Width + Gap
    const ROW_HEIGHT = 400; // Height + Gap
    const SPEED = 0.8;

    // We need enough posts to fill the screen + buffer for looping.
    // Let's duplicate posts to create a large enough set.
    const uniquePosts = posts.length > 0 ? posts : [];

    // Create a "Set" of items
    // If we have few posts, repeat them until we have at least say 20 items per visual set
    const MIN_ITEMS_PER_SET = 20;

    // Create the visual set by repeating uniquePosts
    const visualSet = useMemo(() => {
        if (uniquePosts.length === 0) return [];
        let set = [...uniquePosts];
        while (set.length < MIN_ITEMS_PER_SET) {
            set = [...set, ...uniquePosts];
        }
        return set;
    }, [uniquePosts]);

    // Now create 3 Copies of this set for the loop: [Buffer Before] [Current] [Buffer After]
    // Actually just 2 sets are usually enough for swapping: [A][A]
    // If we scroll left, and reach end of first [A], we snap to start of second [A] (which is effectively start of first [A] visual wise)
    const renderPosts = useMemo(() => [...visualSet, ...visualSet], [visualSet]);

    // Let's define specific positions for one set
    const getPosition = (index: number) => {
        const i = index % visualSet.length;
        const col = i % COLUMNS;
        const row = Math.floor(i / COLUMNS);
        // Add some noise
        const noiseX = (i * 37) % 50;
        const noiseY = (i * 23) % 40;
        const rotate = ((i * 13) % 10) - 5;

        return {
            left: col * COLUMN_WIDTH + noiseX,
            top: row * ROW_HEIGHT + noiseY + 50, // Padding top
            rotate
        };
    };

    // Calculate total width of one set
    const ONE_LOOP_WIDTH = COLUMNS * COLUMN_WIDTH;

    useEffect(() => {
        let animationFrameId: number;

        const autoPan = () => {
            if (isIdle) {
                let currentX = x.get();
                let nextX = currentX - SPEED;

                // Loop Check
                // If we have moved left by ONE_LOOP_WIDTH, snap back by adding ONE_LOOP_WIDTH
                // We are moving negative. So if nextX < -ONE_LOOP_WIDTH, we reset.
                if (nextX <= -ONE_LOOP_WIDTH) {
                    nextX += ONE_LOOP_WIDTH;
                }

                x.set(nextX);
            }
            animationFrameId = requestAnimationFrame(autoPan);
        };

        if (isIdle) {
            animationFrameId = requestAnimationFrame(autoPan);
        }

        return () => cancelAnimationFrame(animationFrameId);
    }, [isIdle, x, ONE_LOOP_WIDTH]);

    const handleDragEnd = () => {
        handleInteractionEnd();

        // Check bounds after drag
        let currentX = x.get();
        if (currentX <= -ONE_LOOP_WIDTH) {
            x.set(currentX + ONE_LOOP_WIDTH);
        } else if (currentX > 0) {
            x.set(currentX - ONE_LOOP_WIDTH);
        }
    };

    const handleInteractionStart = () => {
        setIsIdle(false);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };

    const handleInteractionEnd = () => {
        idleTimerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, 3000);
    };

    return (
        <div
            ref={containerRef}
            className="w-full h-[calc(100vh-250px)] overflow-hidden bg-gray-50 relative cursor-grab active:cursor-grabbing border border-gray-200 rounded-xl shadow-inner touch-none"
            onPointerDown={handleInteractionStart}
            onPointerUp={handleInteractionEnd}
            onPointerLeave={handleInteractionEnd}
        >
            <motion.div
                drag="x" // Constrain to X for easier looping logic in this iteration
                dragElastic={0.05}
                dragMomentum={false} // Disable momentum to strictly control coordinates for loop (easier) or handle manually
                style={{ x, y }}
                onDragStart={handleInteractionStart}
                onDragEnd={handleDragEnd}
                className="absolute top-0 left-0 origin-top-left"
            >
                {/* Render the double set */}
                {renderPosts.map((post, index) => {
                    // We need to calculate position based on index relative to the Set, but Offset by Loop for the second half
                    const isSecondSet = index >= visualSet.length;
                    const normalizedIndex = index % visualSet.length;
                    const pos = getPosition(normalizedIndex);

                    // If second set, shift right by ONE_LOOP_WIDTH
                    const leftOffset = isSecondSet ? ONE_LOOP_WIDTH : 0;

                    return (
                        <FlipCard
                            key={`${post.id}-${index}`} // Unique key for duplicates
                            post={post}
                            style={{
                                position: "absolute",
                                left: pos.left + leftOffset,
                                top: pos.top,
                                transform: `rotate(${pos.rotate}deg)`,
                                zIndex: 1
                            }}
                            onFlip={(flipped) => {
                                if (flipped) handleInteractionStart();
                                else handleInteractionEnd();
                            }}
                        />
                    );
                })}

                {/* Decorative Background */}
                <div className="absolute top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 w-[200vw] h-full pointer-events-none opacity-[0.03] text-[20vw] font-bold text-center flex items-center justify-center">
                    Ngee Ann Poly
                </div>
            </motion.div>

            {/* UI overlay */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm text-sm text-gray-500 pointer-events-none z-10 border border-gray-200">
                {isIdle ? "Auto-playing... Drag to scroll" : "Interactive Mode"}
            </div>
        </div>
    );
}
