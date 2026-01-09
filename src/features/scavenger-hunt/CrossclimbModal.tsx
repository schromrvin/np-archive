import { GlassPane } from "@/components/GlassPane";
import { type CrossclimbConfig } from "./data";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, HelpCircle, Lock, Trophy } from "lucide-react";

interface CrossclimbModalProps {
    config: CrossclimbConfig;
    onComplete: (success: boolean, penalty: number) => void;
}

export function CrossclimbModal({ config, onComplete }: CrossclimbModalProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [inputs, setInputs] = useState<string[]>([]); // Current input for current step
    const [lockedSteps, setLockedSteps] = useState(config.steps.map((_, i) => i > 0)); // Only first step unlocked initially
    const [penalty, setPenalty] = useState(0);

    const activeStepData = config.steps[currentStep];

    // Initialize input array when step changes
    useEffect(() => {
        if (activeStepData) {
            setInputs(Array(activeStepData.answer.length).fill(""));
        }
    }, [currentStep, activeStepData]);

    const handleInputChange = (index: number, value: string) => {
        if (value.length > 1) return; // Only 1 char
        const newInputs = [...inputs];
        newInputs[index] = value.toUpperCase();
        setInputs(newInputs);

        // Auto-focus next input
        if (value && index < inputs.length - 1) {
            const nextInput = document.getElementById(`input-${currentStep}-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !inputs[index] && index > 0) {
            const prevInput = document.getElementById(`input-${currentStep}-${index - 1}`);
            prevInput?.focus();
        }
    };

    const checkAnswer = () => {
        const userAnswer = inputs.join("");
        if (userAnswer === activeStepData.answer) {
            // Correct!
            if (currentStep < config.steps.length - 1) {
                // Unlock next
                setLockedSteps(prev => {
                    const next = [...prev];
                    next[currentStep + 1] = false;
                    return next;
                });
                setCurrentStep(prev => prev + 1);
            } else {
                // Done!
                onComplete(true, penalty);
            }
        } else {
            // Shake effect or feedback (simple alert for prototype)
            const form = document.getElementById("answer-form");
            form?.classList.add("animate-shake");
            setTimeout(() => form?.classList.remove("animate-shake"), 500);
            // Maybe add penalty for wrong guess?
            setPenalty(p => p + 5);
        }
    };

    const useHint = () => {
        // Reveal one random unrevealed letter
        const emptyIndices = inputs.map((val, idx) => val !== activeStepData.answer[idx] ? idx : -1).filter(i => i !== -1);
        if (emptyIndices.length > 0) {
            const randomIdx = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
            const newInputs = [...inputs];
            newInputs[randomIdx] = activeStepData.answer[randomIdx];
            setInputs(newInputs);
            setPenalty(p => p + 10); // Penalty for hint
        }
    };

    return (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <GlassPane className="max-w-md w-full p-6 shadow-2xl bg-white space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                    <h2 className="text-xl font-bold text-np-navy">Crossclimb: {config.ladderTheme}</h2>
                    <div className="flex items-center gap-2 text-sm font-medium text-red-500">
                        {penalty > 0 && <span>-{penalty} pts</span>}
                    </div>
                </div>

                <div className="space-y-2 relative min-h-[300px] flex flex-col justify-end">
                    {config.steps.map((step, idx) => {
                        const isLocked = lockedSteps[idx];
                        const isCompleted = idx < currentStep;
                        const isActive = idx === currentStep;

                        return (
                            <motion.div
                                key={idx}
                                initial={false}
                                animate={{
                                    opacity: isLocked ? 0.5 : 1,
                                    scale: isActive ? 1.05 : 1,
                                    y: isActive ? 0 : 0
                                }}
                                className={cn(
                                    "p-3 rounded-xl border flex items-center justify-between transition-colors",
                                    isActive ? "bg-np-navy/5 border-np-navy shadow-md" : "bg-gray-50 border-gray-100",
                                    isCompleted ? "bg-green-50 border-green-200" : ""
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={cn("size-8 rounded-full flex items-center justify-center font-bold text-xs",
                                        isCompleted ? "bg-green-100 text-green-700" : (isActive ? "bg-np-navy text-white" : "bg-gray-200 text-gray-500")
                                    )}>
                                        {isCompleted ? <CheckCircle className="size-5" /> : idx + 1}
                                    </div>
                                    <span className={cn("text-sm font-medium", isLocked && "blur-sm")}>
                                        {isLocked ? "Locked Question" : step.question}
                                    </span>
                                </div>
                                {isLocked && <Lock className="size-4 text-gray-400" />}
                            </motion.div>
                        );
                    })}
                </div>

                {/* Input Area */}
                <div className="space-y-4 pt-4 border-t">
                    <div id="answer-form" className="flex justify-center gap-2">
                        {inputs.map((char, idx) => (
                            <input
                                key={`input-${currentStep}-${idx}`}
                                id={`input-${currentStep}-${idx}`}
                                type="text"
                                maxLength={1}
                                value={char}
                                onChange={(e) => handleInputChange(idx, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(idx, e)}
                                className="size-10 rounded-lg border-2 border-gray-300 text-center text-xl font-bold uppercase focus:border-np-navy focus:ring-2 focus:ring-np-navy/20 outline-none transition-all"
                            />
                        ))}
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={useHint}
                            className="flex-1 py-3 rounded-xl bg-orange-100 text-orange-700 font-bold hover:bg-orange-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <HelpCircle className="size-4" /> Hint (-10)
                        </button>
                        <button
                            onClick={checkAnswer}
                            className="flex-[2] py-3 rounded-xl bg-np-navy text-white font-bold hover:opacity-90 transition-opacity"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </GlassPane>
        </div>
    );
}
