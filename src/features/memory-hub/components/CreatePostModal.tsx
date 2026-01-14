
import { useState, useRef } from "react";
import { X, Image as ImageIcon, Loader2 } from "lucide-react";
import type { Post } from "../types";
import { clsx } from "clsx";
import { motion, AnimatePresence } from "framer-motion";

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (post: Post) => void;
}

export function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content && !selectedImage) return;

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newPost: Post = {
            id: Date.now().toString(),
            user: {
                id: "me",
                name: "You",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
                role: "Student",
            },
            type: "image",
            mediaUrl: selectedImage || "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
            content,
            likes: 0,
            comments: [],
            timestamp: "Just now",
            location: "Ngee Ann Polytechnic",
        };

        onSubmit(newPost);
        setContent("");
        setSelectedImage(null);
        setIsSubmitting(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden relative z-10"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <h2 className="text-lg font-semibold text-gray-900">Create New Post</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4">
                            <div className="flex gap-3 mb-4">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" alt="You" className="w-10 h-10 rounded-full border border-gray-200" />
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="Share your favorite NP memory..."
                                    className="flex-1 w-full p-2 text-gray-900 placeholder:text-gray-400 focus:outline-none resize-none min-h-[100px]"
                                />
                            </div>

                            {selectedImage && (
                                <div className="relative mb-4 rounded-xl overflow-hidden group">
                                    <img src={selectedImage} alt="Preview" className="w-full h-48 object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => setSelectedImage(null)}
                                        className="absolute top-2 right-2 bg-black/50 p-1.5 rounded-full text-white hover:bg-black/70 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="flex items-center gap-2 text-gray-500 hover:text-np-red-600 transition-colors font-medium text-sm"
                                >
                                    <ImageIcon className="w-5 h-5" />
                                    Add Photo/Video
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageSelect} />
                                </button>

                                <button
                                    type="submit"
                                    disabled={(!content && !selectedImage) || isSubmitting}
                                    className={clsx(
                                        "px-6 py-2 rounded-full font-medium text-white transition-all duration-300 flex items-center gap-2",
                                        (!content && !selectedImage) || isSubmitting ? "bg-gray-300 cursor-not-allowed" : "bg-np-red-600 hover:bg-np-red-700 shadow-lg hover:shadow-xl"
                                    )}
                                >
                                    {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Post
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
