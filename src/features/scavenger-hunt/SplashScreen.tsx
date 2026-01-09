import { GlassPane } from "@/components/GlassPane";
import { ArrowRight, Trophy, Clock, Gift, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
    onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
    const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

    // Set a fixed end date for "NP Day" (e.g., 3 days from now)
    useEffect(() => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 3); // Ends in 3 days

        const timer = setInterval(() => {
            const now = new Date();
            const difference = endDate.getTime() - now.getTime();

            if (difference <= 0) {
                clearInterval(timer);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((difference / 1000 / 60) % 60);
                const seconds = Math.floor((difference / 1000) % 60);
                setTimeLeft({ days, hours, minutes, seconds });
            }
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="fixed inset-0 z-40 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-6 bg-[url('/bg-pattern.png')] bg-cover bg-blend-overlay overflow-y-auto">
            <GlassPane className="max-w-2xl w-full p-8 md:p-12 shadow-2xl bg-white/10 dark:bg-black/40 border-white/20 text-white relative overflow-hidden my-auto">
                {/* Decorative background blobs */}
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-np-gold/30 rounded-full blur-3xl rounded-full pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-np-navy/50 rounded-full blur-3xl rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-8 pb-32 md:pb-0">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/10 p-4 rounded-full border border-white/20 shadow-lg backdrop-blur-md"
                    >
                        <MapPin className="size-12 text-np-gold" />
                    </motion.div>

                    <div>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-2 drop-shadow-lg">
                            NP DAY <span className="text-np-gold">HUNT</span>
                        </h1>
                        <p className="text-lg text-white/80 font-medium max-w-lg mx-auto">
                            Explore the campus, uncover history, and win exclusive prizes in the ultimate archival adventure.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-xl">
                        {[
                            { label: "Days", value: timeLeft?.days || 0 },
                            { label: "Hours", value: timeLeft?.hours || 0 },
                            { label: "Mins", value: timeLeft?.minutes || 0 },
                            { label: "Secs", value: timeLeft?.seconds || 0 },
                        ].map((item, idx) => (
                            <div key={idx} className="bg-black/30 backdrop-blur p-3 rounded-xl border border-white/10 flex flex-col items-center">
                                <span className="text-2xl font-bold font-mono text-white">{String(item.value).padStart(2, '0')}</span>
                                <span className="text-xs uppercase tracking-widest text-white/60">{item.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full text-left">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Trophy className="size-5 text-np-gold" /> Win Prizes
                            </h3>
                            <ul className="text-sm text-white/70 space-y-1 list-disc list-inside">
                                <li>Limited Edition NP Hoodies</li>
                                <li>$50 Campus Vouchers</li>
                                <li>Exclusive Archive Merch</li>
                            </ul>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-left">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Clock className="size-5 text-blue-400" /> Scoring Rules
                            </h3>
                            <ul className="text-sm text-white/70 space-y-1 list-none">
                                <li>✨ <strong>1000 pts</strong> per checkpoint start</li>
                                <li>📉 <strong>-10 pts</strong> every 10 seconds</li>
                                <li>❌ <strong>-10 pts</strong> for wrong answers</li>
                                <li>💡 <strong>-10 pts</strong> for hints</li>
                            </ul>
                        </div>
                    </div>

                    <button
                        onClick={onStart}
                        className="group relative w-full md:w-auto px-8 py-4 bg-np-gold hover:bg-yellow-400 text-np-navy font-black text-xl rounded-2xl shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
                    >
                        START ADVENTURE
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    {/* Spacer for mobile nav */}
                    <div className="h-16 md:hidden" />
                </div>
            </GlassPane>
        </div>
    );
}
