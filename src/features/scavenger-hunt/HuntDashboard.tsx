import { useState, useEffect } from "react";
import { GlassPane } from "@/components/GlassPane";
import { QRScannerSim } from "./QRScannerSim";
import { QuizCard } from "./QuizCard";
import { CrossclimbCard } from "./CrossclimbCard";
import { ClueCard } from "./ClueCard";
import { HUNT_DATA } from "./data";
import { Trophy, ArrowRight, Map as MapIcon, Timer, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { usePageTitle } from "@/lib/usePageTitle";
import { SplashScreen } from "./SplashScreen";
import { NavigationMap } from "./NavigationMap";
import { motion, AnimatePresence } from "framer-motion";

export function HuntDashboard() {
    usePageTitle("NP Archive | Scavenger Hunt");
    const [hasStarted, setHasStarted] = useState(false);
    const [showMap, setShowMap] = useState(false);

    // Game State
    const [stageIndex, setStageIndex] = useState(0);
    const [totalPoints, setTotalPoints] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [showChallenge, setShowChallenge] = useState(false);
    const [completed, setCompleted] = useState(false);

    // Per-stage Timer State
    const [stageSeconds, setStageSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // Derive current stage
    const currentStage = HUNT_DATA[stageIndex];

    useEffect(() => {
        // Check local storage for persistence on mount
        // const storedStart = localStorage.getItem("hunt_started");
        // if (storedStart === "true") {
        //     setHasStarted(true);
        // }
    }, []);

    const handleStart = () => {
        setHasStarted(true);
        localStorage.setItem("hunt_started", "true");
    };

    // Timer Logic
    useEffect(() => {
        let interval: any;
        if (isTimerRunning && !completed) {
            interval = setInterval(() => {
                setStageSeconds(s => s + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning, completed]);

    const handleScanStart = () => {
        setIsScanning(true);
    };

    const handleScanComplete = () => {
        setIsScanning(false);
        setShowChallenge(true);
        // Start timer ONLY after scan is complete (entering challenge phase)
        setStageSeconds(0);
        setIsTimerRunning(true);
    };

    const handleChallengeComplete = (success: boolean, penalty: number) => {
        if (success) {
            setIsTimerRunning(false);

            // Score Calculation:
            // Base: 1000 pts per stage
            // Time Decay: -10 pts per 10 seconds
            // Penalties: passed from modal (incorrect answers/hints)

            const startScore = 1000;
            const timePenalty = Math.floor(stageSeconds / 10) * 10;
            const stageScore = Math.max(0, startScore - timePenalty - penalty);

            setTotalPoints((p) => p + stageScore);
            setShowChallenge(false);

            // Move to next stage or finish
            setTimeout(() => {
                const nextIndex = stageIndex + 1;
                if (nextIndex < HUNT_DATA.length) {
                    setStageIndex(nextIndex);
                    // Reset timer state for next stage (wont start until scan)
                    setStageSeconds(0);
                } else {
                    setCompleted(true);
                    localStorage.removeItem("hunt_started"); // Clear on completion
                }
            }, 500);
        } else {
            setShowChallenge(false);
        }
    };

    if (!hasStarted) {
        return <SplashScreen onStart={handleStart} />;
    }

    if (completed) {
        return (
            <div className="min-h-screen p-6 pb-24 flex flex-col items-center justify-center space-y-6 max-w-lg mx-auto text-center bg-[url('/bg-pattern.png')] bg-fixed bg-cover">
                <GlassPane className="p-8 space-y-6 flex flex-col items-center shadow-2xl border-np-gold/50 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-np-navy via-np-gold to-np-navy" />

                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="size-32 rounded-full bg-yellow-100 flex items-center justify-center mb-4 shadow-lg border-4 border-white"
                    >
                        <Trophy className="size-16 text-yellow-600" />
                    </motion.div>

                    <div>
                        <h1 className="text-4xl font-black text-np-navy mb-2">MISSION COMPLETE!</h1>
                        <p className="text-gray-600 font-medium">You have mastered the archive.</p>
                    </div>

                    <div className="py-6 w-full bg-white/50 rounded-xl border border-white/60">
                        <div className="text-sm text-gray-500 uppercase tracking-widest mb-1">Final Score</div>
                        <div className="text-6xl font-bold text-np-gold font-mono drop-shadow-sm">{totalPoints}</div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-xl text-sm text-np-navy border border-blue-100">
                        <span className="font-bold block mb-1">🎉 Winner Announcement</span>
                        Winners will be announced on <span className="font-bold underline">NP Day (Main Stage), 4:00 PM</span>. KEEP THIS SCREENSHOT!
                    </div>

                    <Link to="/" className="w-full py-4 rounded-xl bg-np-navy text-white font-bold flex items-center justify-center gap-2 hover:bg-np-navy/90 transition-colors shadow-lg">
                        Back to Home <ArrowRight className="size-4" />
                    </Link>
                </GlassPane>
            </div>
        )
    }

    const mins = Math.floor(stageSeconds / 60).toString().padStart(2, '0');
    const secs = (stageSeconds % 60).toString().padStart(2, '0');

    return (
        <div className="min-h-screen p-6 pb-24 space-y-6 max-w-lg mx-auto">
            <header className="flex justify-between items-center pt-8 md:pt-20">
                <div>
                    <h1 className="text-3xl font-bold text-np-navy flex items-center gap-2">
                        Scavenger Hunt
                    </h1>
                    <p className="text-np-gold font-medium">Checkpoint {stageIndex + 1} of {HUNT_DATA.length}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowMap(true)}
                        className="size-10 rounded-full bg-white shadow-md flex items-center justify-center text-np-navy hover:scale-110 transition-transform"
                    >
                        <MapIcon className="size-5" />
                    </button>
                    <div className="bg-white/50 backdrop-blur px-4 py-2 rounded-xl text-lg font-black shadow-sm text-np-navy border border-white/50 flex flex-col items-end leading-none">
                        <span className="text-[10px] font-medium text-gray-500 uppercase">Score</span>
                        {totalPoints}
                    </div>
                </div>
            </header>

            {/* Timer Banner - Only show when running */}
            {isTimerRunning && (
                <div className="flex justify-center sticky top-4 z-[60]">
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex items-center gap-3 bg-slate-900 text-white px-6 py-2 rounded-full font-mono shadow-xl border-2 border-white/20"
                    >
                        <Timer className="size-5 animate-pulse text-red-400" />
                        <span className="text-xl font-bold">{mins}:{secs}</span>
                        <span className="text-xs text-slate-400 border-l border-slate-700 pl-3 ml-1">-10pts / 10s</span>
                    </motion.div>
                </div>
            )}

            {/* Current Clue OR Inline Challenge */}
            <AnimatePresence mode="wait">
                {!showChallenge ? (
                    <motion.div
                        key="clue"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ClueCard stage={currentStage} stageNumber={stageIndex + 1} />

                        {/* Action Simulation - Only show here when NOT in challenge */}
                        <div className="pt-8 w-full flex flex-col gap-6">
                            <button
                                onClick={handleScanStart}
                                className="group w-full py-5 rounded-2xl bg-gradient-to-r from-np-navy to-slate-800 text-white font-bold shadow-lg shadow-np-navy/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 overflow-hidden relative"
                            >
                                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="size-8 rounded-lg bg-white/20 flex items-center justify-center">
                                    <HelpCircle className="size-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <div className="text-xs font-normal text-white/60 uppercase tracking-widest">Action</div>
                                    <div className="text-lg leading-none">Scan Location QR</div>
                                </div>
                            </button>

                            <Link to="/leaderboard">
                                <GlassPane className="p-4 flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer border border-white/50 group">
                                    <span className="text-sm font-medium text-gray-600 group-hover:text-np-navy transition-colors">Current Rank</span>
                                    <span className="text-lg font-bold text-np-navy">#42</span>
                                </GlassPane>
                            </Link>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="challenge"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentStage.type === 'quiz' && currentStage.quiz && (
                            <QuizCard
                                config={currentStage.quiz}
                                onComplete={handleChallengeComplete}
                            />
                        )}

                        {currentStage.type === 'crossclimb' && currentStage.crossclimb && (
                            <CrossclimbCard
                                config={currentStage.crossclimb}
                                onComplete={handleChallengeComplete}
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modals */}
            <NavigationMap isOpen={showMap} onClose={() => setShowMap(false)} />

            {/* Render Scanner Simulator */}
            {isScanning && (
                <QRScannerSim
                    onScanComplete={handleScanComplete}
                    onClose={() => setIsScanning(false)}
                />
            )}
        </div>
    );
}
