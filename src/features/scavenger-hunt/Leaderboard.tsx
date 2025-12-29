import { GlassPane } from "@/components/GlassPane";
import { Link } from "react-router-dom";
import { ArrowLeft, Medal } from "lucide-react";

const LEADERBOARD_DATA = [
    { rank: 1, name: "Sarah Tan", points: 1250, school: "ICT" },
    { rank: 2, name: "Jason Lim", points: 1200, school: "BA" },
    { rank: 3, name: "Farah Binte", points: 1150, school: "HMS" },
    { rank: 4, name: "David Chen", points: 1100, school: "SOE" },
    { rank: 5, name: "You", points: 0, school: "SDE" }, // Dynamic in real app
];

export function Leaderboard() {
    return (
        <div className="min-h-screen p-6 pb-24 max-w-lg mx-auto space-y-6">
            <header className="flex items-center gap-4 pt-8 md:pt-20">
                <Link to="/scavenger-hunt" className="p-2 bg-white/50 rounded-full hover:bg-white/80">
                    <ArrowLeft className="size-5 text-gray-700" />
                </Link>
                <h1 className="text-2xl font-bold text-np-navy">Leaderboard</h1>
            </header>

            <GlassPane className="p-0 overflow-hidden">
                <div className="bg-np-navy/5 p-4 border-b border-gray-200">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500">Top Scavengers</h2>
                </div>
                <div className="divide-y divide-gray-100">
                    {LEADERBOARD_DATA.map((user) => (
                        <div key={user.rank} className="flex items-center justify-between p-4 hover:bg-white/40 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-8 font-bold text-gray-400 text-center flex justify-center">
                                    {user.rank <= 3 ? <Medal className={`size-6 ${user.rank === 1 ? 'text-yellow-500 fill-yellow-500' : user.rank === 2 ? 'text-gray-400 fill-gray-400' : 'text-amber-700 fill-amber-700'}`} /> : <span className="text-lg">{user.rank}</span>}
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">{user.name}</p>
                                    <p className="text-xs text-gray-500">{user.school}</p>
                                </div>
                            </div>
                            <div className="font-mono font-bold text-np-navy">{user.points} pts</div>
                        </div>
                    ))}
                </div>
            </GlassPane>
        </div>
    );
}
