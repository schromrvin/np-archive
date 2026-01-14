
import { useState } from "react";
import { Plus } from "lucide-react";
import { PostCard } from "../components/PostCard";
import { MOCK_POSTS } from "../data";
import type { Post } from "../types";
import { CreatePostModal } from "../components/CreatePostModal";

export function CampusWall() {
    const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreatePost = (newPost: Post) => {
        // Prepend the new post
        setPosts([newPost, ...posts]);
        setIsCreateModalOpen(false);
    };

    return (
        <div className="relative min-h-screen">
            {/* Stories / Highlight Bar (Optional placeholder) */}
            <div className="flex gap-4 overflow-x-auto pb-6 mb-6 px-2 scrollbar-hide">
                {/* Add story bubbles here if needed */}
            </div>

            {/* Feed Layout */}
            <div className="max-w-xl mx-auto">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
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
