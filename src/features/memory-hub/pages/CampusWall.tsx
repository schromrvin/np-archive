
import { useState } from "react";
import { Plus, LayoutGrid, List } from "lucide-react";
import { PostCard } from "../components/PostCard";
import { InfiniteCanvas } from "../components/InfiniteCanvas";
import { MOCK_POSTS } from "../data";
import type { Post } from "../types";
import { CreatePostModal } from "../components/CreatePostModal";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export function CampusWall() {
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState<"collage" | "feed">("collage");

    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [activeYear, setActiveYear] = useState<string>("All Time");

    const categories = ["All", "Campus Life", "Events", "Throwback", "Academic", "Arts"];
    const years = ["All Time", "2024", "2023", "2022", "2018"];

    const handleCreatePost = (newPost: Post) => {
        // Prepend the new post
        setPosts([newPost, ...posts]);
        setIsCreateModalOpen(false);
    };

    const filteredPosts = posts.filter(post => {
        const matchCategory = activeCategory === "All" || post.category === activeCategory;
        const matchYear = activeYear === "All Time" || post.date.includes(activeYear) || (activeYear === "2018" && post.category === "Throwback"); // Simple logic for demo
        return matchCategory && matchYear;
    });

    return (
        <div className="relative min-h-screen pb-20">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 px-4 gap-4">
                {/* Filters */}
                <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 md:pb-0 custom-scrollbar">
                    <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm shrink-0">
                        <select
                            value={activeYear}
                            onChange={(e) => setActiveYear(e.target.value)}
                            className="text-sm font-medium text-gray-700 bg-transparent py-1 px-2 focus:outline-none cursor-pointer hover:text-np-navy"
                        >
                            {years.map(y => <option key={y} value={y}>{y}</option>)}
                        </select>
                    </div>

                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={clsx(
                                "px-3 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                                activeCategory === cat ? "bg-np-navy text-white shadow-sm" : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* View Toggle */}
                <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex items-center gap-1 shrink-0">
                    <button
                        onClick={() => setViewMode("collage")}
                        className={clsx(
                            "p-2 rounded-md transition-all",
                            viewMode === "collage" ? "bg-gray-100 text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
                        )}
                        title="Kiosk (Infinite) View"
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
            <div className={clsx("transition-all duration-500", viewMode === "collage" ? "w-full" : "max-w-xl mx-auto")}>
                <AnimatePresence mode="wait">
                    {viewMode === "collage" ? (
                        <motion.div
                            key="collage"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="w-full h-full"
                        >
                            {/* Infinite Canvas needs enough items to look good, so we might duplicate if filtered result is small */}
                            <InfiniteCanvas posts={filteredPosts.length < 5 ? [...filteredPosts, ...filteredPosts, ...filteredPosts] : filteredPosts} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="feed"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            {filteredPosts.length > 0 ? filteredPosts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            )) : (
                                <div className="text-center py-20">
                                    <p className="text-gray-400">No memories found for this filter.</p>
                                    <button onClick={() => { setActiveCategory("All"); setActiveYear("All Time"); }} className="text-np-navy font-medium mt-2 hover:underline">Clear Filters</button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* FAB for Mobile / Action Button for Desktop */}
            <button
                onClick={() => setIsCreateModalOpen(true)}
                className="fixed bottom-24 right-6 md:bottom-12 md:right-12 bg-gradient-to-r from-np-navy to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 z-40 group"
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
