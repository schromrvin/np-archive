
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, TrendingUp, Users, X } from "lucide-react";
import { clsx } from "clsx";

// --- Types ---
interface WrappedStats {
    semester: string;
    year: string;
    topVibe: string;
    totalMemories: number;
    mostActiveSchool: string;
    topEvent: string;
    funnyQuote: string;
    bgColor: string; // Gradient class
}

// --- Mock Data ---
const WRAPPED_DATA: Record<string, WrappedStats> = {
    "current-campus": {
        semester: "Apr Semester",
        year: "2024",
        topVibe: "Studious 📚",
        totalMemories: 12503,
        mostActiveSchool: "School of ICT",
        topEvent: "Red Camp 24",
        funnyQuote: "\"If the shuttle bus is full, is it a sign to go home?\" 🤔",
        bgColor: "from-np-navy to-blue-900",
    },
    "current-school": {
        semester: "Apr Semester",
        year: "2024",
        topVibe: "Creative 🎨",
        totalMemories: 4200,
        mostActiveSchool: "School of ICT", // Self
        topEvent: "Hackathon 2024",
        funnyQuote: "\"Canteen 4 chicken rice is the only reason I come to school.\" 🍗",
        bgColor: "from-purple-900 to-indigo-900",
    },
    "2023-oct": {
        semester: "Oct Semester",
        year: "2023",
        topVibe: "Sleepy 😴",
        totalMemories: 9800,
        mostActiveSchool: "School of Business",
        topEvent: "Poly 50",
        funnyQuote: "\"Do we really need 8am classes?\" 😭",
        bgColor: "from-teal-900 to-emerald-900",
    }
};

export function NPWrapped() {
    const [view, setView] = useState<"landing" | "story">("landing");
    const [scope, setScope] = useState<"campus" | "school">("campus"); // Campus-wide vs School-specific
    const [selectedHistory, setSelectedHistory] = useState<string | null>(null); // For history view

    // Which data to show?
    const activeDataKey = selectedHistory || (scope === "campus" ? "current-campus" : "current-school");
    const data = WRAPPED_DATA[activeDataKey];

    const toggleScope = () => setScope(prev => prev === "campus" ? "school" : "campus");

    return (
        <div className="max-w-4xl mx-auto min-h-[600px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
                {view === "landing" ? (
                    <LandingView
                        key="landing"
                        data={data}
                        scope={scope}
                        onToggleScope={toggleScope}
                        onStart={() => setView("story")}
                        onSelectHistory={(key) => {
                            if (key === "current-campus") {
                                setSelectedHistory(null);
                                setScope("campus");
                            } else {
                                setSelectedHistory(key);
                            }
                        }}
                    />
                ) : (
                    <StoryView
                        key="story"
                        data={data}
                        onClose={() => setView("landing")}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

function LandingView({ data, scope, onToggleScope, onStart, onSelectHistory }: { data: WrappedStats, scope: "campus" | "school", onToggleScope: () => void, onStart: () => void, onSelectHistory: (key: string) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={clsx("w-full max-w-lg bg-gradient-to-br rounded-3xl shadow-2xl overflow-hidden text-white relative", data.bgColor)}
        >
            {/* Background Texture (Abstract) */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-repeat"></div>

            <div className="relative z-10 p-10 flex flex-col items-center text-center h-[600px] justify-between">

                {/* Header Toggle */}
                <div className="bg-white/10 backdrop-blur-md p-1 rounded-full flex gap-1">
                    <button
                        onClick={() => scope === "school" && onToggleScope()}
                        className={clsx("px-4 py-1.5 rounded-full text-sm font-bold transition-all", scope === "campus" ? "bg-white text-np-navy shadow-sm" : "text-white/70 hover:text-white")}
                    >
                        NP Global
                    </button>
                    <button
                        onClick={() => scope === "campus" && onToggleScope()}
                        className={clsx("px-4 py-1.5 rounded-full text-sm font-bold transition-all", scope === "school" ? "bg-white text-np-navy shadow-sm" : "text-white/70 hover:text-white")}
                    >
                        My School (ICT)
                    </button>
                </div>

                {/* Main Title */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block bg-np-gold text-np-navy px-4 py-1 rounded-full font-black tracking-widest text-xs uppercase"
                    >
                        {data.semester} {data.year}
                    </motion.div>
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-5xl font-black leading-tight tracking-tight"
                    >
                        Your Semester<br />Wrapped
                    </motion.h2>
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white/80 text-lg font-medium max-w-xs mx-auto"
                    >
                        Relive the moments that defined {data.year}.
                    </motion.p>
                </div>

                {/* Play Button */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStart}
                    className="group bg-white text-np-navy w-20 h-20 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all"
                >
                    <Play className="w-8 h-8 fill-current ml-1" />
                </motion.button>

                {/* Footer Stats Preview */}
                <div className="grid grid-cols-2 gap-4 w-full mb-6">
                    <div className="bg-white/10 rounded-2xl p-4 text-left">
                        <TrendingUp className="w-5 h-5 mb-2 text-np-gold" />
                        <div className="text-2xl font-bold">{data.totalMemories.toLocaleString()}</div>
                        <div className="text-xs text-white/60 font-medium">Memories Shared</div>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 text-left">
                        <Users className="w-5 h-5 mb-2 text-np-gold" />
                        <div className="text-lg font-bold truncate">{data.topVibe}</div>
                        <div className="text-xs text-white/60 font-medium">Top Vibe</div>
                    </div>
                </div>

                {/* History Selector */}
                <div className="z-20">
                    <p className="text-xs text-white/40 uppercase tracking-widest font-bold mb-2">From the Archives</p>
                    <div className="flex gap-2 justify-center">
                        {["2023-oct"].map(key => (
                            <button
                                key={key}
                                onClick={() => onSelectHistory(key)}
                                className="px-3 py-1 bg-white/5 hover:bg-white/20 rounded-full text-xs text-white/70 transition-colors border border-white/10"
                            >
                                {key === "2023-oct" ? "Oct 2023" : key}
                            </button>
                        ))}
                        <button
                            onClick={() => onSelectHistory("current-campus")} // Reset
                            className="px-3 py-1 bg-white/5 hover:bg-white/20 rounded-full text-xs text-white/70 transition-colors border border-white/10"
                        >
                            Current
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

function StoryView({ data, onClose }: { data: WrappedStats, onClose: () => void }) {
    const [step, setStep] = useState(0);
    const totalSteps = 4;

    // Auto-advance logic could go here, but manual is fine for prototype

    const handleNext = () => {
        if (step < totalSteps - 1) setStep(step + 1);
        else onClose(); // Finish
    };

    const handleBack = () => {
        if (step > 0) setStep(step - 1);
    };

    const slides = [
        // Slide 1: Vibe
        <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-8xl">😎</motion.div>
            <div>
                <h3 className="text-2xl font-bold text-white/60 mb-2">The Vibe Check</h3>
                <h2 className="text-5xl font-black text-white">{data.topVibe}</h2>
            </div>
            <p className="text-xl text-white/80">Students were feeling it this semester.</p>
        </div>,

        // Slide 2: Stats
        <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-8">
            <h3 className="text-3xl font-bold text-white mb-6">By The Numbers</h3>
            <div className="space-y-6 w-full max-w-sm">
                <div className="bg-white/20 rounded-xl p-6 flex items-center justify-between">
                    <span className="font-bold text-lg">Memories</span>
                    <span className="text-3xl font-black text-np-gold">{data.totalMemories}</span>
                </div>
                <div className="bg-white/20 rounded-xl p-6 flex items-center justify-between">
                    <span className="font-bold text-lg">Top Event</span>
                    <span className="text-xl font-bold text-white text-right">{data.topEvent}</span>
                </div>
            </div>
        </div>,

        // Slide 3: Quote
        <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <Users className="w-16 h-16 text-np-gold mb-8 opacity-50" />
            <h3 className="text-xl font-bold text-white/60 mb-6 uppercase tracking-widest">Quote of the Sem</h3>
            <blockquote className="text-4xl font-black text-white leading-tight italic">
                {data.funnyQuote}
            </blockquote>
        </div>,

        // Slide 4: Summary
        <div className="flex flex-col items-center justify-center h-full text-center p-8 space-y-10">
            <h2 className="text-4xl font-black text-white">See you next sem!</h2>
            <div className="bg-white text-np-navy p-8 rounded-3xl shadow-xl transform rotate-3">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">My Semester Stats</div>
                <div className="text-3xl font-black mb-1">{data.topVibe}</div>
                <div className="text-lg font-bold text-gray-600">Top Event: {data.topEvent}</div>
            </div>
            <button onClick={onClose} className="bg-np-gold text-np-navy px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-transform">
                Share My Wrapped
            </button>
        </div>
    ];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={clsx("w-full max-w-lg h-[700px] bg-gradient-to-br rounded-3xl shadow-2xl overflow-hidden text-white relative flex flex-col", data.bgColor)}
        >
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat pointer-events-none"></div>

            {/* Progress Bar */}
            <div className="flex gap-1 p-4 absolute top-0 w-full z-20">
                {Array.from({ length: totalSteps }).map((_, i) => (
                    <div key={i} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: i < step ? "100%" : "0%" }}
                            animate={{ width: i < step ? "100%" : i === step ? "100%" : "0%" }}
                            transition={{ duration: i === step ? 5 : 0, ease: "linear" }}
                        />
                    </div>
                ))}
            </div>

            {/* Controls */}
            <div className="absolute inset-0 flex z-10">
                <div className="w-1/3 h-full cursor-pointer" onClick={handleBack}></div>
                <div className="w-2/3 h-full cursor-pointer" onClick={handleNext}></div>
            </div>

            {/* Content */}
            <div className="relative z-0 h-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full"
                    >
                        {slides[step]}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Close Button */}
            <button onClick={onClose} className="absolute top-6 right-6 z-20 p-2 bg-black/20 rounded-full hover:bg-black/40 transition-colors">
                <X className="w-5 h-5 text-white" />
            </button>
        </motion.div>
    );
}
