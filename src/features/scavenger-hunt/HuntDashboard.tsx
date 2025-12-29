import { useState } from "react";
import { GlassPane } from "@/components/GlassPane";
import { QRScannerSim } from "./QRScannerSim";
import { QuizModal } from "./QuizModal";
import { ClueCard } from "./ClueCard";
import { HUNT_DATA } from "./data";
import { Trophy, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function HuntDashboard() {
    const [stageIndex, setStageIndex] = useState(0);
    const [points, setPoints] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [completed, setCompleted] = useState(false);

    // Derive current stage
    const currentStage = HUNT_DATA[stageIndex];

    const handleScanStart = () => {
        setIsScanning(true);
    };

    const handleScanComplete = () => {
        setIsScanning(false);
        setShowQuiz(true);
    };

    const handleQuizComplete = (success: boolean) => {
        if (success) {
            setTimeout(() => {
                setPoints((p) => p + currentStage.points);
                setShowQuiz(false);
                const nextIndex = stageIndex + 1;
                if (nextIndex < HUNT_DATA.length) {
                    setStageIndex(nextIndex);
                } else {
                    setCompleted(true);
                }
            }, 1000);
        } else {
            // Handle incorrect answer (maybe deduct points or just try again)
            // For now, just close and let them try again (simulated by re-opening or keeping open)
            // In this implementation, we re-trigger scan or just let them try.
            // Let's just reset quiz to try again.
            setShowQuiz(false);
            alert("Incorrect! Hints: Check the location plaque.");
        }
    };

    if (completed) {
        return (
            <div className="min-h-screen p-6 pb-24 flex flex-col items-center justify-center space-y-6 max-w-lg mx-auto text-center">
                <GlassPane className="p-8 space-y-6 flex flex-col items-center">
                    <div className="size-24 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                        <Trophy className="size-12 text-yellow-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-np-navy">Mission Accomplished!</h1>
                    <p className="text-gray-600">You have successfully archived all memories and discovered all locations.</p>

                    <div className="py-6 w-full">
                        <div className="text-sm text-gray-500 uppercase tracking-widest">Total Score</div>
                        <div className="text-5xl font-bold text-np-gold font-mono">{points} pts</div>
                    </div>

                    <Link to="/" className="w-full py-3 rounded-xl bg-np-navy text-white font-bold flex items-center justify-center gap-2">
                        Back to Home <ArrowRight className="size-4" />
                    </Link>
                </GlassPane>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-6 pb-24 space-y-6 max-w-lg mx-auto">
            <header className="flex justify-between items-center pt-8 md:pt-20">
                <div>
                    <h1 className="text-3xl font-bold text-np-navy">Scavenger Hunt</h1>
                    <p className="text-np-gold font-medium">Checkpoint {stageIndex + 1} of {HUNT_DATA.length}</p>
                </div>
                <div className="bg-white/50 backdrop-blur px-3 py-1 rounded-full text-sm font-bold shadow-sm text-slate-800">
                    {points} Pts
                </div>
            </header>

            {/* Current Clue */}
            <ClueCard stage={currentStage} stageNumber={stageIndex + 1} />

            {/* Action Simulation */}
            <div className="pt-4 w-full">
                <button
                    onClick={handleScanStart}
                    className="w-full py-4 rounded-xl bg-np-navy text-white font-bold shadow-lg shadow-np-navy/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    Simulate Scan QR
                </button>
                <p className="text-xs text-center text-gray-400 mt-2">Stand near "{currentStage.locationName}" to scan</p>
            </div>

            <Link to="/leaderboard">
                <GlassPane className="p-4 flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
                    <span className="text-sm font-medium text-gray-600">Leaderboard Rank</span>
                    <span className="text-lg font-bold text-np-navy">#42</span>
                </GlassPane>
            </Link>

            {/* Render Scanner Simulator */}
            {isScanning && (
                <QRScannerSim
                    onScanComplete={handleScanComplete}
                    onClose={() => setIsScanning(false)}
                />
            )}

            {/* Render Quiz */}
            {showQuiz && (
                <QuizModal
                    quiz={currentStage.quiz}
                    onComplete={handleQuizComplete}
                />
            )}
        </div>
    );
}
