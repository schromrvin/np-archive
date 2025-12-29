import { GlassPane } from "@/components/GlassPane";
import { type HuntStage } from "./data";
import { MapPin } from "lucide-react";

interface ClueCardProps {
    stage: HuntStage;
    stageNumber: number;
}

export function ClueCard({ stage, stageNumber }: ClueCardProps) {
    return (
        <GlassPane className="relative overflow-hidden min-h-[350px] flex flex-col justify-center items-center text-center space-y-6">
            <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-blue-50/50 to-amber-50/50 opacity-50 -z-10" />

            <div className="absolute top-6 right-6">
                <span className="text-[10px] font-mono tracking-widest text-gray-400 border border-gray-300 rounded px-2 py-0.5">
                    CLUE #{stageNumber}
                </span>
            </div>

            <div className="space-y-4 max-w-xs mx-auto">
                <h2 className="text-sm uppercase tracking-widest text-np-gold font-bold">Current Objective</h2>
                <p className="text-2xl font-serif text-slate-800 italic leading-relaxed">
                    "{stage.clue}"
                </p>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-gray-500 text-xs">
                <MapPin className="size-3" />
                <span>Find the QR Code at location</span>
            </div>
        </GlassPane>
    );
}
