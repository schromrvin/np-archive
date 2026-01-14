
import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import type { Thread } from "../types";
import { clsx } from "clsx";

interface CreateThreadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (thread: Thread) => void;
}

export function CreateThreadModal({ isOpen, onClose, onSubmit }: CreateThreadModalProps) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState<Thread["category"]>("General");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) return;

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newThread: Thread = {
            id: Date.now().toString(),
            title,
            content,
            category,
            author: {
                id: "me",
                name: "You",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
                role: "Student",
            },
            upvotes: 0,
            commentCount: 0,
            timestamp: "Just now",
        };

        onSubmit(newThread);
        setTitle("");
        setContent("");
        setCategory("General");
        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Start a Discussion</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="What's on your mind?"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-np-red-500/20 focus:border-np-red-500 transition-all font-semibold text-lg"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as Thread["category"])}
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-np-red-500/20 focus:border-np-red-500 transition-all"
                        >
                            <option value="General">General</option>
                            <option value="Academic">Academic</option>
                            <option value="Confessions">Confessions</option>
                            <option value="Lost & Found">Lost & Found</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Elaborate on your thoughts..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-np-red-500/20 focus:border-np-red-500 transition-all min-h-[150px] resize-y"
                            required
                        />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={clsx(
                                "px-8 py-2.5 rounded-full font-medium text-white transition-all duration-300 flex items-center gap-2",
                                isSubmitting ? "bg-gray-300" : "bg-np-red-600 hover:bg-np-red-700 shadow-md hover:shadow-lg"
                            )}
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            Post Thread
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
