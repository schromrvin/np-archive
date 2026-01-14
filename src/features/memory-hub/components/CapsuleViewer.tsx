
import { motion, AnimatePresence } from "framer-motion";
import { X, Unlock, Calendar } from "lucide-react";
import type { Capsule } from "../types";

interface CapsuleViewerProps {
    capsule: Capsule | null;
    onClose: () => void;
}

export function CapsuleViewer({ capsule, onClose }: CapsuleViewerProps) {
    return (
        <AnimatePresence>
            {capsule && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />
                    <motion.div
                        layoutId={`capsule-${capsule.id}`}
                        className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden relative z-10 shadow-2xl"
                    >
                        <div className="relative h-64 md:h-80">
                            <img
                                src={capsule.coverImage}
                                alt={capsule.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors backdrop-blur-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-green-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-white">
                                        <Unlock className="w-3 h-3" /> Unlocked
                                    </span>
                                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-white">
                                        <Calendar className="w-3 h-3" /> Originally sealed on {new Date(capsule.createdAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">{capsule.title}</h1>
                                <p className="text-white/80 text-lg">{capsule.description}</p>
                            </div>
                        </div>

                        <div className="p-8 md:p-10 bg-white min-h-[200px]">
                            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Memory Content</h3>
                            <div className="prose prose-lg text-gray-700 max-w-none">
                                <p>{capsule.content || "This capsule contains no written text, only the cover memory."}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
