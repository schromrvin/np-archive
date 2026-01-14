
import type { Post } from "../types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CollageItemProps {
    post: Post;
    index: number;
    onClick: () => void;
}

export function CollageItem({ post, index, onClick }: CollageItemProps) {
    // Random rotation for that "scattered" look
    const rotation = index % 2 === 0 ? 2 : -2;
    const yOffset = index % 3 === 0 ? 10 : 0;

    return (
        <motion.div
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            className={cn(
                "relative cursor-pointer group bg-white p-3 pb-8 shadow-md hover:shadow-xl transition-all duration-300 rounded-sm break-inside-avoid mb-6",
                "transform"
            )}
            style={{ rotate: `${rotation}deg`, translateY: `${yOffset}px` }}
            onClick={onClick}
        >
            <div className="aspect-[4/5] overflow-hidden mb-2 bg-gray-100">
                <img
                    src={post.mediaUrl}
                    alt={post.content}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="text-center font-handwriting text-gray-600 text-sm line-clamp-2">
                {post.content}
            </div>

            {/* Tape effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-6 bg-white/30 backdrop-blur-sm border-l border-r border-white/40 shadow-sm opacity-60 rotate-1"></div>
        </motion.div>
    );
}
