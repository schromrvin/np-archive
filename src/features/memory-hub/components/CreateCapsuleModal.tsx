
import { useState } from "react";
import { X, Calendar as CalendarIcon, Loader2, Lock } from "lucide-react";
import type { Capsule } from "../types";
import { clsx } from "clsx";

interface CreateCapsuleModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (capsule: Capsule) => void;
}

export function CreateCapsuleModal({ isOpen, onClose, onSubmit }: CreateCapsuleModalProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [unlockDate, setUnlockDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !unlockDate) return;

        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500)); // Longer delay for "sealing" effect

        const newCapsule: Capsule = {
            id: Date.now().toString(),
            title,
            description,
            unlockDate,
            createdAt: new Date().toISOString().split('T')[0],
            isLocked: true,
            coverImage: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800&auto=format&fit=crop", // Default geometric/abstract
        };

        onSubmit(newCapsule);
        setTitle("");
        setDescription("");
        setUnlockDate("");
        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-gray-100">
                <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-6 text-white text-center">
                    <h2 className="text-xl font-bold mb-1">Seal a Time Capsule</h2>
                    <p className="text-sm text-gray-400">Lock away a memory for your future self.</p>
                </div>

                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capsule Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. My Graduation Wishes"
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Unlock Date</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={unlockDate}
                                onChange={(e) => setUnlockDate(e.target.value)}
                                min={new Date().toISOString().split('T')[0]} // Cannot be in past
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all font-mono"
                                required
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">The capsule cannot be opened before this date.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message / Description</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Write something to your future self..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500/20 focus:border-gray-500 transition-all min-h-[100px] resize-none"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={clsx(
                                "w-full py-3 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2",
                                isSubmitting ? "bg-gray-400" : "bg-gradient-to-r from-gray-900 to-gray-700 hover:shadow-lg hover:scale-[1.01]"
                            )}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" /> Sealing Capsule...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" /> Seal Capsule
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
