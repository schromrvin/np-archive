
import { Heart, MessageCircle, Share2, MoreHorizontal, Bookmark } from "lucide-react";
import type { Post } from "../types";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    const [liked, setLiked] = useState(post.isLiked);
    const [likeCount, setLikeCount] = useState(post.likes);

    const handleLike = () => {
        if (liked) {
            setLikeCount((prev) => prev - 1);
        } else {
            setLikeCount((prev) => prev + 1);
        }
        setLiked(!liked);
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-6">
            {/* Header */}
            <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <img
                            src={post.user.avatar}
                            alt={post.user.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        {/* Story ring simulation (optional visuals) */}
                        <div className="absolute -inset-0.5 rounded-full border-2 border-np-red-500/50 pointer-events-none"></div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm text-gray-900">{post.user.name}</h3>
                        {post.location && (
                            <p className="text-xs text-gray-500">{post.location}</p>
                        )}
                    </div>
                </div>
                <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            </div>

            {/* Media */}
            <div className="relative bg-gray-100 aspect-square md:aspect-[4/3] w-full">
                <img
                    src={post.mediaUrl}
                    alt="Post content"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            </div>

            {/* Actions */}
            <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLike}
                            className="group flex focus:outline-none"
                        >
                            <Heart
                                className={cn(
                                    "w-6 h-6 transition-all duration-300",
                                    liked
                                        ? "fill-np-red-600 stroke-np-red-600 scale-110"
                                        : "stroke-gray-600 group-hover:stroke-np-red-600"
                                )}
                            />
                        </button>
                        <button className="group focus:outline-none">
                            <MessageCircle className="w-6 h-6 stroke-gray-600 group-hover:stroke-blue-600 transition-colors" />
                        </button>
                        <button className="group focus:outline-none">
                            <Share2 className="w-6 h-6 stroke-gray-600 group-hover:stroke-green-600 transition-colors" />
                        </button>
                    </div>
                    <button className="group focus:outline-none">
                        <Bookmark className="w-6 h-6 stroke-gray-600 group-hover:fill-gray-600 transition-colors" />
                    </button>
                </div>

                {/* Likes Count */}
                <div className="mb-2">
                    <span className="font-semibold text-sm text-gray-900">{likeCount.toLocaleString()} likes</span>
                </div>

                {/* Caption */}
                <div className="mb-2">
                    <span className="font-semibold text-sm text-gray-900 mr-2">{post.user.name}</span>
                    <span className="text-sm text-gray-700">{post.content}</span>
                </div>

                {/* Comments Link */}
                <button className="text-gray-500 text-sm mb-2 hover:text-gray-700">
                    View all {post.comments.length > 0 ? post.comments.length + 5 : "comments"}
                </button>

                {/* Timestamp */}
                <p className="text-[10px] uppercase text-gray-400 font-medium tracking-wide">
                    {post.timestamp}
                </p>
            </div>
        </div>
    );
}
