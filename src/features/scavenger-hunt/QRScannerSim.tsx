import { motion } from "framer-motion";
import { X, Scan } from "lucide-react";
import { useEffect } from "react";

interface QRScannerSimProps {
    onScanComplete: () => void;
    onClose: () => void;
}

export function QRScannerSim({ onScanComplete, onClose }: QRScannerSimProps) {
    useEffect(() => {
        // Simulate scan delay
        const timer = setTimeout(() => {
            onScanComplete();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onScanComplete]);

    return (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
            <div className="absolute top-4 right-4 z-50">
                <button onClick={onClose} className="p-2 bg-black/50 rounded-full text-white">
                    <X className="size-6" />
                </button>
            </div>

            <div className="relative w-72 h-72 border-2 border-white/30 rounded-3xl overflow-hidden shadow-2xl">
                {/* Animated Scanner Bar */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-np-gold shadow-[0_0_20px_2px_rgba(242,169,0,0.8)]"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Camera simulation */}
                <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                    <Scan className="text-white/20 size-24 animate-pulse" />
                </div>

                {/* Corner Markers */}
                <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-np-gold rounded-tl-xl" />
                <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-np-gold rounded-tr-xl" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-np-gold rounded-bl-xl" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-np-gold rounded-br-xl" />
            </div>

            <p className="mt-8 text-white font-medium animate-pulse">Scanning for Checkpoint...</p>
        </div>
    );
}
