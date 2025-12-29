import { GlassPane } from "@/components/GlassPane";
import { type QuizQuestion } from "./data";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

interface QuizModalProps {
    quiz: QuizQuestion;
    onComplete: (success: boolean) => void;
}

export function QuizModal({ quiz, onComplete }: QuizModalProps) {
    const [selected, setSelected] = useState<number | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSubmit = () => {
        if (selected === null) return;
        const correct = selected === quiz.correctIndex;
        setHasSubmitted(true);
        setIsCorrect(correct);

        setTimeout(() => {
            onComplete(correct);
        }, 2000); // Wait 2s before closing/advancing
    };

    return (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <GlassPane className="max-w-md w-full p-8 shadow-2xl bg-white space-y-6">
                <h2 className="text-xl font-bold text-np-navy text-center">Checkpoint Challenge</h2>

                <div className="space-y-4">
                    <p className="text-lg font-medium text-slate-800 text-center">{quiz.question}</p>

                    <div className="space-y-2 mt-4">
                        {quiz.options.map((option, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between",
                                    !hasSubmitted && selected === idx ? "border-np-navy bg-np-navy/5" : "border-gray-200 hover:border-gray-300",
                                    hasSubmitted && idx === quiz.correctIndex ? "border-green-500 bg-green-50 text-green-700" : "",
                                    hasSubmitted && selected === idx && idx !== quiz.correctIndex ? "border-red-500 bg-red-50 text-red-700" : ""
                                )}
                                onClick={() => !hasSubmitted && setSelected(idx)}
                            >
                                <span>{option}</span>
                                {hasSubmitted && idx === quiz.correctIndex && <CheckCircle className="size-5 text-green-600" />}
                                {hasSubmitted && selected === idx && idx !== quiz.correctIndex && <XCircle className="size-5 text-red-600" />}
                            </div>
                        ))}
                    </div>
                </div>

                {!hasSubmitted && (
                    <button
                        onClick={handleSubmit}
                        disabled={selected === null}
                        className="w-full py-3 rounded-xl bg-np-navy text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Submit Answer
                    </button>
                )}

                {hasSubmitted && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn("text-center font-bold", isCorrect ? "text-green-600" : "text-red-500")}
                    >
                        {isCorrect ? "Correct! Unlocking next clue..." : "Incorrect. Try again!"}
                    </motion.div>
                )}
            </GlassPane>
        </div>
    );
}
