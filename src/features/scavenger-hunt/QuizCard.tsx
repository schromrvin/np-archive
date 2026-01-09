import { GlassPane } from "@/components/GlassPane";
import { type QuizConfig, shuffleArray } from "./data";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface QuizCardProps {
    config: QuizConfig;
    onComplete: (success: boolean, penalty: number) => void;
}

export function QuizCard({ config, onComplete }: QuizCardProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<string | null>(null);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);
    const [penalty, setPenalty] = useState(0);

    const currentQuestion = config.questions[currentIndex];

    useEffect(() => {
        // Shuffle current question options
        setShuffledOptions(shuffleArray(currentQuestion.options));
        setSelected(null);
        setHasSubmitted(false);
        setIsCorrect(false);
    }, [currentIndex, currentQuestion]);

    const handleSubmit = () => {
        if (selected === null) return;
        const correct = selected === currentQuestion.correctAnswer;
        setHasSubmitted(true);
        setIsCorrect(correct);

        if (correct) {
            // Correct logic
        } else {
            // Incorrect - increment penalty
            setPenalty(p => p + 10);
        }
    };

    const handleNext = () => {
        if (currentIndex < config.questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // Finished all questions
            onComplete(true, penalty);
        }
    };

    const progress = ((currentIndex + 1) / config.questions.length) * 100;

    return (
        <GlassPane className="w-full p-6 shadow-xl bg-white space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
                <div className="flex flex-col">
                    <h2 className="text-xl font-bold text-np-navy">Checkpoint Challenge</h2>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">Question {currentIndex + 1} of {config.questions.length}</span>
                </div>
                {penalty > 0 && <span className="text-red-500 font-bold text-sm bg-red-50 px-2 py-1 rounded-md">-{penalty} pts</span>}
            </div>

            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-np-gold transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                >
                    <p className="text-lg font-medium text-slate-800">{currentQuestion.question}</p>

                    <div className="space-y-3">
                        {shuffledOptions.map((option, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    "p-4 rounded-xl border cursor-pointer transition-all duration-200 flex items-center justify-between",
                                    !hasSubmitted && selected === option ? "border-np-navy bg-np-navy/5 shadow-sm" : "border-gray-200 hover:border-gray-300",
                                    hasSubmitted && isCorrect && option === currentQuestion.correctAnswer ? "border-green-500 bg-green-50 text-green-700 shadow-sm" : "",
                                    hasSubmitted && !isCorrect && selected === option ? "border-red-500 bg-red-50 text-red-700 shadow-sm" : "",
                                    hasSubmitted && !isCorrect && option !== selected ? "opacity-50" : ""
                                )}
                                onClick={() => !hasSubmitted && setSelected(option)}
                            >
                                <span className="font-medium">{option}</span>
                                {hasSubmitted && isCorrect && option === currentQuestion.correctAnswer && <CheckCircle className="size-5 text-green-600" />}
                                {hasSubmitted && !isCorrect && selected === option && <XCircle className="size-5 text-red-600" />}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="pt-2">
                {!hasSubmitted && (
                    <button
                        onClick={handleSubmit}
                        disabled={selected === null}
                        className="w-full py-3.5 rounded-xl bg-np-navy text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-np-navy/20 active:scale-[0.98] transition-all"
                    >
                        Submit Answer
                    </button>
                )}

                {hasSubmitted && !isCorrect && (
                    <div className="text-center space-y-3 animate-in fade-in slide-in-from-bottom-2">
                        <div className="font-bold text-red-500">Incorrect. Try again! (-10 pts)</div>
                        <button
                            onClick={() => {
                                setHasSubmitted(false);
                                setSelected(null);
                                setIsCorrect(false);
                            }}
                            className="w-full py-3.5 rounded-xl bg-gray-100 text-gray-700 font-bold hover:bg-gray-200 active:scale-[0.98] transition-all"
                        >
                            Retry
                        </button>
                    </div>
                )}

                {hasSubmitted && isCorrect && (
                    <button
                        onClick={handleNext}
                        className="w-full py-3.5 rounded-xl bg-green-600 text-white font-bold shadow-lg shadow-green-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 animate-in zoom-in-95"
                    >
                        {currentIndex < config.questions.length - 1 ? "Next Question" : "Complete Stage"} <ArrowRight className="size-5" />
                    </button>
                )}
            </div>
        </GlassPane>
    );
}
