import { GlassPane } from "@/components/GlassPane";
import { type QuizQuestion, shuffleArray } from "./data";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface QuizModalProps {
    quiz: QuizQuestion;
    onComplete: (success: boolean, penalty: number) => void;
}

export function QuizModal({ quiz, onComplete }: QuizModalProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [penalty, setPenalty] = useState(0);

    useEffect(() => {
        // Shuffle options when quiz changes or mounts
        setShuffledOptions(shuffleArray(quiz.options));
        setSelected(null);
        setHasSubmitted(false);
        setPenalty(0);
    }, [quiz]);

    const handleSubmit = () => {
        if (selected === null) return;
        const correct = selected === quiz.correctAnswer;
        setHasSubmitted(true);
        setIsCorrect(correct);

        if (correct) {
            setTimeout(() => {
                onComplete(true, penalty);
            }, 1500);
        } else {
            // Incorrect - increment penalty
            setPenalty(p => p + 10);
        }
    };

    const handleRetry = () => {
        setHasSubmitted(false);
        setSelected(null);
        setIsCorrect(false);
    };

    return (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
            <GlassPane className="max-w-md w-full p-8 shadow-2xl bg-white space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold text-np-navy">Checkpoint Challenge</h2>
                    {penalty > 0 && <span className="text-red-500 font-bold text-sm">-{penalty} pts</span>}
                </div>

                <div className="space-y-4">
                    <p className="text-lg font-medium text-slate-800 text-center">{quiz.question}</p>

                    <div className="space-y-2 mt-4">
                        {shuffledOptions.map((option, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between",
                                    !hasSubmitted && selected === option ? "border-np-navy bg-np-navy/5" : "border-gray-200 hover:border-gray-300",
                                    hasSubmitted && isCorrect && option === quiz.correctAnswer ? "border-green-500 bg-green-50 text-green-700" : "",
                                    hasSubmitted && !isCorrect && selected === option ? "border-red-500 bg-red-50 text-red-700" : "",
                                    hasSubmitted && !isCorrect && option !== selected ? "opacity-50" : ""
                                )}
                                onClick={() => !hasSubmitted && setSelected(option)}
                            >
                                <span>{option}</span>
                                {hasSubmitted && isCorrect && option === quiz.correctAnswer && <CheckCircle className="size-5 text-green-600" />}
                                {hasSubmitted && !isCorrect && selected === option && <XCircle className="size-5 text-red-600" />}
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

                {hasSubmitted && !isCorrect && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="text-center font-bold text-red-500">
                            Incorrect. Try again!
                        </div>
                        <button
                            onClick={handleRetry}
                            className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="size-4" /> Retry
                        </button>
                    </motion.div>
                )}

                {hasSubmitted && isCorrect && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center font-bold text-green-600"
                    >
                        Correct! Unlocking next clue...
                    </motion.div>
                )}
            </GlassPane>
        </div>
    );
}
