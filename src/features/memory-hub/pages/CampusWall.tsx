
import { useState } from "react";
import { Plus, LayoutGrid, List } from "lucide-react";
import { PostCard } from "../components/PostCard";
import { CollageItem } from "../components/CollageItem";
import { MOCK_POSTS } from "../data";
import type { Post } from "../types";
import { CreatePostModal } from "../components/CreatePostModal";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export function CampusWall() {
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"collage" | "feed">("collage");

    const handleCreatePost = (newPost: Post) => {
        // Prepend the new post
        setPosts([newPost, ...posts]);
        setIsCreateModalOpen(false);
    };

    return (
        <div className="relative min-h-screen pb-20">
            {/* View Toggle */}
            <div className="flex justify-end mb-6 px-4">
                <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex items-center gap-1">
                    <button
                        onClick={() => setViewMode("collage")}
                        className={clsx(
                            "p-2 rounded-md transition-all",
                            viewMode === "collage" ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                        )}
                        title="Collage View"
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode("feed")}
                        className={clsx(
                            "p-2 rounded-md transition-all",
                            viewMode === "feed" ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                        )}
                        title="Feed View"
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Feed Layout */}
            <div className={clsx("transition-all duration-500", viewMode === "collage" ? "max-w-5xl mx-auto px-4" : "max-w-xl mx-auto")}>
                <AnimatePresence mode="wait">
                    {viewMode === "collage" ? (
                        <motion.div
                            key="collage"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6"
                        >
                            {posts.map((post, index) => (
                                <CollageItem
                                    key={`collage-${post.id}`}
                                    post={post}
                                    index={index}
                                    onClick={() => { }} // Could open lightbox
                                />
                            ))}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="feed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* FAB for Mobile / Action Button for Desktop */}
            <button
                onClick={() => setIsCreateModalOpen(true)}
                className="fixed bottom-24 right-6 md:bottom-12 md:right-12 bg-gradient-to-r from-np-red-600 to-np-red-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 z-40 group"
            >
                <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <CreatePostModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreatePost}
            />
        </div>
    );
}
