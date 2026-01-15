import { NavLink } from "react-router-dom";
import { Home, Map, Compass, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function NavBar() {
    const navItems = [
        { icon: Home, label: "Home", to: "/" },
        { icon: Map, label: "Navigator", to: "/navigator" },
        { icon: Compass, label: "Scavenger Hunt", to: "/scavenger-hunt", highlight: true },
        { icon: Search, label: "Memory", to: "/memory" },
    ];

    return (
        <>
            {/* Mobile Bottom Tab Bar */}
            <nav className="site-navbar fixed bottom-0 left-0 right-0 z-50 md:hidden">
                <div className="mx-4 mb-4 rounded-3xl bg-white/80 backdrop-blur-xl border border-white/40 shadow-glass px-6 py-3 flex justify-between items-center dark:bg-slate-900/80">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                cn(
                                    "flex flex-col items-center gap-1 transition-all duration-300 p-2",
                                    isActive ? "text-np-navy" : "text-gray-400 hover:text-gray-600"
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={cn("size-6", isActive && "stroke-[2.5px]")} />
                                    <span className="text-[10px] font-medium">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </div>
            </nav>

            {/* Desktop Top Nav */}
            <nav className="site-navbar hidden md:flex fixed top-0 left-0 right-0 z-50 px-8 py-4 items-center justify-between pointer-events-none">
                <div className="pointer-events-auto bg-glass-bg backdrop-blur-xl border border-glass-border shadow-sm rounded-full px-8 py-3 flex gap-8 mx-auto bg-white/80 dark:bg-slate-900/80">
                    <img src="./logo.png" alt="NP Archive" className="h-6 w-auto hidden" /> {/* Placeholder for logo */}
                    <span className="font-bold text-np-navy tracking-tight text-lg">NP Archive</span>
                    <div className="w-[1px] h-6 bg-gray-300 mx-2"></div>
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                cn(
                                    "flex items-center gap-2 px-4 py-1.5 rounded-full transition-all text-sm font-medium",
                                    isActive ? "bg-np-navy text-white shadow-md" : "text-gray-600 hover:bg-gray-100/50"
                                )
                            }
                        >
                            <item.icon className="size-4" />
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>
        </>
    );
}
