import { GlassPane } from "@/components/GlassPane";
import { type MinigameConfig } from "./data";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Code, RefreshCw } from "lucide-react";

interface MinigameModalProps {
    config: MinigameConfig;
    onComplete: (success: boolean) => void;
}

export function MinigameModal({ config, onComplete }: MinigameModalProps) {
    const [sequence, setSequence] = useState<string[]>([]);
    const [status, setStatus] = useState<'playing' | 'success' | 'fail'>('playing');

    // For the sequence game example: target is key, user must tap in order?
    // Let's make it simpler: "SIMON SAYS" style but static for prototype, or just "Re-order" or "Tap in order".
    // Given the config "Decrypt the code sequence", let's display a scrambled set and they have to click in order of the targetSequence.

    // Fallback if no targetSequence provided
    const target = config.targetSequence || ["1", "2", "3"];

    // Create localized shuffled options for the user to click
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        // Scramble the target sequence to create options
        const scrambled = [...target].sort(() => Math.random() - 0.5);
        setOptions(scrambled);
    }, []); // Run once on mount

    const handleOptionClick = (val: string) => {
        if (status !== 'playing') return;

        // Check if the clicked value matches the next expected value in the sequence
        const nextExpectedIndex = sequence.length;
        const expectedValue = target[nextExpectedIndex];

        if (val === expectedValue) {
            const newSeq = [...sequence, val];
            setSequence(newSeq);

            if (newSeq.length === target.length) {
                setStatus('success');
                setTimeout(() => onComplete(true), 1500);
            }
        } else {
            setStatus('fail');
            // Shake effect or visual feedback
            setTimeout(() => {
                setSequence([]); // Reset progress
                setStatus('playing'); // Try again
            }, 1000);
        }
    };

    return (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <GlassPane className="max-w-md w-full p-8 shadow-2xl bg-slate-900 border-slate-700 text-white space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-green-400 flex items-center gap-2">
                        <Code className="size-5" /> SYSTEM HACK
                    </h2>
                    <div className="text-xs font-mono text-slate-400">{sequence.length}/{target.length}</div>
                </div>

                <div className="space-y-4">
                    <p className="text-lg font-mono text-center text-green-200 border-b border-green-900/50 pb-4">
                        {config.instructions}
                    </p>

                    <div className="bg-black/50 p-4 rounded-lg font-mono text-center tracking-[0.5em] text-2xl h-16 flex items-center justify-center border border-green-900/50 shadow-inner">
                        {sequence.map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-green-500"
                            >
                                {char}
                            </motion.span>
                        ))}
                        {sequence.length === 0 && <span className="text-slate-700 text-sm tracking-normal">ENTER SEOUENCE...</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">
                        {options.map((opt, idx) => {
                            // Check if this option has already been selected (and is correct part of sequence)
                            // Ideally remove it or disable it.
                            const isUsed = sequence.includes(opt) && target.slice(0, sequence.length).includes(opt) && sequence.filter(x => x === opt).length >= options.filter(x => x === opt).length;
                            // The logic above is complex for duplicates, assuming unique keys for this prototype.
                            // Let's assume unique characters for simplicity as per data.
                            const isSelected = sequence.includes(opt);

                            return (
                                <motion.button
                                    key={idx}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => !isSelected && handleOptionClick(opt)}
                                    disabled={isSelected || status !== 'playing'}
                                    className={cn(
                                        "h-16 rounded-xl border-2 font-mono text-xl font-bold transition-all flex items-center justify-center",
                                        isSelected
                                            ? "border-green-900 bg-green-900/20 text-green-800 opacity-50"
                                            : "border-green-500/50 bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:border-green-400",
                                        status === 'fail' && !isSelected && "animate-pulse border-red-500 text-red-500"
                                    )}
                                >
                                    {opt}
                                </motion.button>
                            )
                        })}
                    </div>
                </div>

                {status === 'success' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center font-bold text-green-500 flex flex-col items-center gap-2"
                    >
                        <CheckCircle className="size-8" />
                        ACCESS GRANTED
                    </motion.div>
                )}

                {status === 'fail' && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center font-bold text-red-500 flex flex-col items-center gap-2"
                    >
                        <XCircle className="size-8" />
                        ACCESS DENIED - RETRYING...
                    </motion.div>
                )}
            </GlassPane>
        </div>
    );
}
