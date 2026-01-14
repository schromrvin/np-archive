
import { NavLink, Outlet } from "react-router-dom";
import { LayoutGrid, MessageSquare, Clock } from "lucide-react";
import { clsx } from "clsx";

export function MemoryHubLayout() {
    const tabs = [
        { name: "Campus Wall", path: "wall", icon: LayoutGrid },
        { name: "Student Voices", path: "voices", icon: MessageSquare },
        { name: "Time Capsule", path: "capsule", icon: Clock },
    ];

    return (
        <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-np-red-600 to-np-red-500 mb-2">
                    Memory Hub
                </h1>
                <p className="text-gray-600">
                    Capture, share, and relive the Ngee Ann spirit.
                </p>
            </div>

            <nav className="flex justify-center mb-8">
                <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-gray-200 flex gap-1">
                    {tabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            className={({ isActive }) =>
                                clsx(
                                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "bg-np-red-600 text-white shadow-md"
                                        : "text-gray-600 hover:bg-gray-100"
                                )
                            }
                        >
                            <tab.icon className="w-4 h-4" />
                            <span>{tab.name}</span>
                        </NavLink>
                    ))}
                </div>
            </nav>

            <div className="min-h-[500px]">
                <Outlet />
            </div>
        </div>
    );
}
