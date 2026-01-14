
import { useState } from "react";
import { X, MessageSquare, ArrowBigUp, ArrowBigDown, Share2, Flag, Send } from "lucide-react";
import type { Thread, Comment } from "../types";
import { motion, AnimatePresence } from "framer-motion";

interface ThreadDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    thread: Thread | null;
}

// Mock comments for demo
const MOCK_COMMENTS: Comment[] = [
    {
        id: "c1",
        user: { id: "u2", name: "Sarah Tan", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah", role: "Student" },
        content: "Totally agree with this! The Wi-Fi at Block 51 is always spotty.",
        timestamp: "2 hours ago"
    },
    {
        id: "c2",
        user: { id: "u3", name: "Jason Lim", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jason", role: "Alumni" },
        content: "Back in my day (2018), we just used personal hotspots. Kids these days...",
        timestamp: "5 hours ago"
    }
];

export function ThreadDetailModal({ isOpen, onClose, thread }: ThreadDetailModalProps) {
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);

    if (!isOpen || !thread) return null;

    const handleSendComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: Date.now().toString(),
            user: { id: "me", name: "You", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me", role: "Student" },
            content: newComment,
            timestamp: "Just now"
        };

        setComments([...comments, comment]);
        setNewComment("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-white rounded-2xl w-full max-w-3xl h-[80vh] shadow-2xl overflow-hidden relative z-10 flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="bg-gray-100 px-2.5 py-1 rounded-full text-xs font-semibold text-gray-700 uppercase tracking-wide">
                                    {thread.category}
                                </span>
                                <span>• Posted by {thread.author.name}</span>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            {/* Original Post */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">{thread.title}</h2>
                                <p className="text-gray-700 text-lg leading-relaxed whitespace-pre-wrap">{thread.content}</p>

                                {/* Action Bar */}
                                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-100">
                                    <div className="flex items-center bg-gray-100 rounded-full px-1">
                                        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors"><ArrowBigUp className="w-6 h-6 text-gray-500" /></button>
                                        <span className="font-bold text-sm text-gray-700 px-1">{thread.upvotes}</span>
                                        <button className="p-2 hover:bg-gray-200 rounded-full transition-colors"><ArrowBigDown className="w-6 h-6 text-gray-500" /></button>
                                    </div>

                                    <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors font-medium text-sm">
                                        <MessageSquare className="w-4 h-4" /> {comments.length} Comments
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors font-medium text-sm">
                                        <Share2 className="w-4 h-4" /> Share
                                    </button>
                                    <button className="flex items-center gap-2 text-gray-500 hover:bg-gray-100 px-3 py-2 rounded-full transition-colors font-medium text-sm ml-auto">
                                        <Flag className="w-4 h-4" /> Report
                                    </button>
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="space-y-6">
                                <h3 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-2">Discussion</h3>
                                {comments.map((comment) => (
                                    <div key={comment.id} className="flex gap-3">
                                        <img src={comment.user.avatar} className="w-9 h-9 rounded-full bg-gray-100 border border-gray-200" />
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="font-semibold text-gray-900 text-sm">{comment.user.name}</span>
                                                <span className="text-xs text-gray-500 text-[10px] uppercase border border-gray-200 px-1 rounded">{comment.user.role}</span>
                                                <span className="text-xs text-gray-400 ml-auto">{comment.timestamp}</span>
                                            </div>
                                            <p className="text-gray-700 text-sm leading-relaxed">{comment.content}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Input */}
                        <div className="p-4 bg-gray-50 border-t border-gray-200">
                            <form onSubmit={handleSendComment} className="flex gap-3 items-center">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me" className="w-8 h-8 rounded-full border border-gray-200" />
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Add to the discussion..."
                                        className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-np-navy/20 focus:border-np-navy transition-all shadow-sm"
                                    />
                                    <button
                                        type="submit"
                                        disabled={!newComment.trim()}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-np-navy text-white rounded-full hover:bg-np-navy/90 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
