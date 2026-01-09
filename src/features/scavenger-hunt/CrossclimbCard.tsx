import { GlassPane } from "@/components/GlassPane";
import { type CrossclimbConfig } from "./data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle, HelpCircle, ArrowUp } from "lucide-react";

interface CrossclimbCardProps {
    config: CrossclimbConfig;
    onComplete: (success: boolean, penalty: number) => void;
}

export function CrossclimbCard({ config, onComplete }: CrossclimbCardProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [penalty, setPenalty] = useState(0);
    const [revealedCount, setRevealedCount] = useState(0);
    const [shake, setShake] = useState(false);

    const activeStep = config.steps[currentStep];

    const handleSubmit = (e?: React.FormEvent) => {
        e?.preventDefault();

        if (inputValue.toUpperCase().trim() === activeStep.answer.toUpperCase()) {
            setInputValue("");
            setRevealedCount(0);
            if (currentStep < config.steps.length - 1) {
                setCurrentStep(prev => prev + 1);
            } else {
                onComplete(true, penalty);
            }
        } else {
            // Wrong answer
            setPenalty(p => p + 10);
            setShake(true);
            setTimeout(() => setShake(false), 500);
        }
    };

    const handleHint = () => {
        if (revealedCount < activeStep.answer.length) {
            setPenalty(p => p + 10);
            setRevealedCount(prev => prev + 1);
        }
    };

    return (
        <GlassPane className="w-full p-6 shadow-xl bg-white space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-np-navy">Crossclimb Challenge</h2>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Theme: {config.ladderTheme}</span>
                </div>
                {penalty > 0 && <span className="text-red-500 font-bold text-sm bg-red-50 px-2 py-1 rounded-md">-{penalty} pts</span>}
            </div>

            {config.note && (
                <div className="text-xs font-medium text-np-navy bg-np-navy/5 p-3 rounded-lg border border-np-navy/20 flex items-center gap-2">
                    <span className="text-lg">💡</span> {config.note}
                </div>
            )}

            {/* Ladder Visualization */}
            <div className="flex flex-col gap-2 relative py-2">
                {/* Completed Steps */}
                {config.steps.slice(0, currentStep).map((step, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-green-50 border border-green-200 flex justify-between items-center opacity-60">
                        <span className="font-mono font-bold text-green-700 tracking-widest">{step.answer}</span>
                        <CheckCircle className="size-4 text-green-600" />
                    </div>
                ))}
            </div>

            {/* Active Step */}
            <motion.div
                animate={shake ? { x: [-5, 5, -5, 5, 0] } : {}}
                className="space-y-4 bg-np-navy/5 p-4 rounded-xl border-2 border-np-navy/20"
            >
                <div>
                    <span className="text-[10px] font-bold text-np-navy uppercase tracking-widest mb-1 block">Clue {currentStep + 1}</span>
                    <p className="font-medium text-slate-800">{activeStep.question}</p>
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder={`${activeStep.answer.length} Letters`}
                        className="flex-1 bg-white border border-gray-300 rounded-lg px-4 py-3 font-mono text-lg uppercase tracking-widest focus:ring-2 focus:ring-np-navy focus:border-transparent outline-none"
                        maxLength={activeStep.answer.length}
                        autoFocus
                    />
                    <button
                        type="submit"
                        className="bg-np-navy text-white rounded-lg px-4 font-bold shadow-lg shadow-np-navy/20 active:scale-95 transition-transform"
                    >
                        <ArrowUp className="size-5" />
                    </button>
                </form>

                {revealedCount > 0 && (
                    <div className="text-xs text-np-gold font-bold bg-np-gold/10 p-2 rounded border border-np-gold/20 animate-in fade-in flex gap-1 font-mono tracking-widest">
                        Hint:
                        <span className="text-np-navy">
                            {activeStep.answer.substring(0, revealedCount)}
                            <span className="opacity-30">
                                {Array(activeStep.answer.length - revealedCount).fill('_').join('')}
                            </span>
                        </span>
                    </div>
                )}
            </motion.div>

            <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-slate-400">Step {currentStep + 1} of {config.steps.length}</span>
                <button
                    onClick={handleHint}
                    disabled={revealedCount >= activeStep.answer.length}
                    className="text-xs font-bold text-slate-500 hover:text-np-navy flex items-center gap-1 disabled:opacity-50"
                >
                    <HelpCircle className="size-3" />
                    {revealedCount >= activeStep.answer.length ? "Fully Revealed" : "Reveal Letter (-10 pts)"}
                </button>
            </div>
        </GlassPane>
    );
}
