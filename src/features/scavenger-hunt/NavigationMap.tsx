// import { GlassPane } from "@/components/GlassPane";
import { X, Map as MapIcon } from "lucide-react";
// import { useState } from "react";
import mapImage from "@/assets/campus_map.png"; // We will ensure this exists
import { motion, AnimatePresence } from "framer-motion";

interface NavigationMapProps {
    isOpen: boolean;
    onClose: () => void;
}

export function NavigationMap({ isOpen, onClose }: NavigationMapProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="relative max-w-4xl w-full h-[80vh] bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="absolute top-4 right-4 z-10 flex gap-2">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-white/80 hover:bg-white text-gray-800 shadow-md transition-colors"
                        >
                            <X className="size-6" />
                        </button>
                    </div>

                    <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur px-4 py-2 rounded-xl shadow-md border border-gray-100">
                        <h2 className="font-bold text-np-navy flex items-center gap-2">
                            <MapIcon className="size-5" /> Campus Map
                        </h2>
                    </div>

                    <div className="flex-1 overflow-auto bg-blue-50 relative flex items-center justify-center">
                        {/* Map Image container with simple pan/zoom simulation (scroll) */}
                        <div className="min-w-[1000px] min-h-[1000px] relative p-10">
                            {/* In a real app we might use a library like react-zoom-pan-pinch, keeping it simple here */}
                            <img
                                src={mapImage}
                                alt="Campus Map"
                                className="w-full h-full object-contain drop-shadow-xl"
                            />

                            {/* Decorative pins just for visual flair on the static map */}
                            <div className="absolute top-1/3 left-1/4 animate-bounce">
                                <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow-lg">You are here</div>
                                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-t-[8px] border-t-red-500 border-r-[6px] border-r-transparent mx-auto"></div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white border-t border-gray-100 text-center text-sm text-gray-500">
                        <p>Pinch or scroll to navigate. This map guides you to general areas, not exact clues!</p>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
