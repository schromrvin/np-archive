
import { useState } from "react";
import { PenSquare, Search } from "lucide-react";
import { ThreadCard } from "../components/ThreadCard";
import { CreateThreadModal } from "../components/CreateThreadModal";
import { MOCK_THREADS } from "../data";
import type { Thread } from "../types";
import { clsx } from "clsx";

export function StudentVoices() {
    const [threads, setThreads] = useState<Thread[]>(MOCK_THREADS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<string>("All");

    const categories = ["All", "General", "Academic", "Confessions", "Lost & Found"];

    const handleCreateThread = (newThread: Thread) => {
        setThreads([newThread, ...threads]);
        setIsCreateModalOpen(false);
    };

    const filteredThreads = activeCategory === "All"
        ? threads
        : threads.filter(t => t.category === activeCategory);

    return (
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
            {/* Sidebar (Desktop) / Top Bar (Mobile) */}
            <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sticky top-24">
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="w-full bg-np-red-600 text-white rounded-full py-2.5 font-medium shadow-md hover:bg-np-red-700 hover:shadow-lg transition-all flex items-center justify-center gap-2 mb-6"
                    >
                        <PenSquare className="w-4 h-4" />
                        Start Discussion
                    </button>

                    <div className="space-y-1">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Categories</h3>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={clsx(
                                    "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between group",
                                    activeCategory === cat ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                {cat}
                                {cat === activeCategory && <div className="w-1.5 h-1.5 rounded-full bg-np-red-600" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                {/* Search Bar */}
                <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search discussions..."
                        className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-np-red-500/20 focus:border-np-red-500 transition-all text-sm"
                    />
                </div>

                {/* Thread List */}
                <div className="space-y-4">
                    {filteredThreads.map(thread => (
                        <ThreadCard key={thread.id} thread={thread} />
                    ))}

                    {filteredThreads.length === 0 && (
                        <div className="text-center py-12 bg-white rounded-xl border border-gray-100 border-dashed">
                            <p className="text-gray-500">No discussions found in this category.</p>
                        </div>
                    )}
                </div>
            </div>

            <CreateThreadModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateThread}
            />
        </div>
    );
}
