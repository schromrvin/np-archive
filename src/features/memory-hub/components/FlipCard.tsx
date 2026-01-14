
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Post } from "../types";
import { Heart, MessageCircle, MapPin, Calendar } from "lucide-react";

interface FlipCardProps {
    post: Post;
    style?: React.CSSProperties;
    className?: string;
    onFlip?: (isFlipped: boolean) => void;
}

export function FlipCard({ post, style, className, onFlip }: FlipCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        const newState = !isFlipped;
        setIsFlipped(newState);
        onFlip?.(newState);
    };

    return (
        <div
            className={cn("relative w-64 h-80 perspective-1000 cursor-pointer group", className)}
            style={style}
            onClick={handleFlip}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                initial={false}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
            >
                {/* FRONT SIDE - The Photo */}
                <div className="absolute inset-0 backface-hidden bg-white p-3 pb-12 shadow-md rounded-sm flex flex-col items-center">
                    {/* Tape effect */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/30 backdrop-blur-sm border-l border-r border-white/40 shadow-sm opacity-60 rotate-1 z-10 pointer-events-none"></div>

                    <div className="w-full h-full bg-gray-100 overflow-hidden relative">
                        <img
                            src={post.mediaUrl}
                            alt="Memory"
                            className="w-full h-full object-cover pointer-events-none"
                            draggable={false}
                        />
                    </div>
                    <p className="font-handwriting text-gray-600 mt-4 text-sm px-2 text-center line-clamp-1 w-full pointer-events-none select-none">
                        {post.content}
                    </p>

                    <div className="absolute bottom-2 right-3 text-xs text-gray-400 font-mono pointer-events-none select-none">
                        Tap to flip ↻
                    </div>
                </div>

                {/* BACK SIDE - The Details */}
                <div
                    className="absolute inset-0 backface-hidden bg-white p-6 shadow-md rounded-sm rotate-y-180 flex flex-col overflow-y-auto custom-scrollbar"
                >
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-2">
                        <img src={post.user.avatar} className="w-8 h-8 rounded-full bg-gray-100" />
                        <div>
                            <h4 className="font-bold text-sm text-gray-900 leading-none">{post.user.name}</h4>
                            <span className="text-[10px] text-gray-500 uppercase tracking-wide">{post.user.role}</span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 mb-4">
                        <p className="text-gray-700 text-sm font-serif italic leading-relaxed">"{post.content}"</p>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-2 text-xs text-gray-500 mt-auto">
                        {post.location && (
                            <div className="flex items-center gap-1.5">
                                <MapPin className="w-3 h-3 text-np-red-600" />
                                <span>{post.location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-np-navy" />
                            <span>{post.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-100 font-medium text-gray-700">
                            <div className="flex items-center gap-1">
                                <Heart className="w-3 h-3 fill-np-red-600 stroke-np-red-600" /> {post.likes}
                            </div>
                            <div className="flex items-center gap-1">
                                <MessageCircle className="w-3 h-3" /> {post.comments.length}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
