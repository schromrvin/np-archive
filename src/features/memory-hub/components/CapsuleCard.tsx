
import { Lock, Unlock } from "lucide-react";
import type { Capsule } from "../types";
import { cn } from "@/lib/utils";

interface CapsuleCardProps {
    capsule: Capsule;
}

export function CapsuleCard({ capsule }: CapsuleCardProps) {
    const isLocked = new Date(capsule.unlockDate) > new Date(); // Simple check, or use capsule.isLocked

    return (
        <div className="group relative overflow-hidden rounded-2xl shadow-md cursor-pointer h-64 transition-transform hover:-translate-y-1 hover:shadow-xl">
            {/* Background Image */}
            <div
                className={cn(
                    "absolute inset-0 bg-cover bg-center transition-all duration-500",
                    isLocked ? "grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-90" : "brightness-90 hover:scale-105"
                )}
                style={{ backgroundImage: `url(${capsule.coverImage || '/placeholder-capsule.jpg'})` }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <div className="flex items-center gap-2 mb-2">
                    {isLocked ? (
                        <span className="bg-gray-800/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-gray-300">
                            <Lock className="w-3 h-3" /> Locked until {new Date(capsule.unlockDate).toLocaleDateString()}
                        </span>
                    ) : (
                        <span className="bg-green-600/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-white">
                            <Unlock className="w-3 h-3" /> Unlocked
                        </span>
                    )}
                </div>

                <h3 className="text-xl font-bold mb-1 group-hover:text-np-gold-400 transition-colors">{capsule.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-1">{capsule.description}</p>

                {!isLocked && (
                    <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 text-xs font-medium text-white/80">
                        Click to open memory
                    </div>
                )}
            </div>

            {/* Locked Icon Overlay (Centered Big Icon) */}
            {isLocked && (
                <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-10 transition-opacity">
                    <Lock className="w-24 h-24 text-white" />
                </div>
            )}
        </div>
    );
}
