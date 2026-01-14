
import { NavLink, Outlet } from "react-router-dom";
import { LayoutGrid, MessageSquare, Clock } from "lucide-react";
import { clsx } from "clsx";

export function MemoryHubLayout() {
    const tabs = [
        { name: "Campus Wall", path: "wall", icon: LayoutGrid },
        { name: "Student Voices", path: "voices", icon: MessageSquare },
        { name: "Time Capsule", path: "capsule", icon: Clock },
    ];
    // NOTE: Wrapped is a special section, maybe accessible via a banner or special button, but user asked for it to be a section.
    // Let's add a "Wrapped" tab for now to make it easily accessible as requested "add as new section".
    // Wait, "Wrapped" usually implies a yearly thing. Let's add it.

    // User Update: "default view when clicked is to show current wrapped, but theres a button users can click to view past wraps"
    // So 'Recap' or 'Wrapped' tab.


    // Actually let's just use the tabs array directly
    const allTabs = [
        ...tabs,
        { name: "NP Wrapped", path: "wrapped", icon: () => <span className="font-bold text-xs bg-np-gold text-np-navy px-1 rounded">24</span> } // Custom icon for wrapped
    ];

    return (
        <div className="container mx-auto px-4 py-8 pb-24 md:pb-8">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-np-navy to-blue-800 mb-2">
                    Memory Hub
                </h1>
                <p className="text-gray-600">
                    Capture, share, and relive the Ngee Ann spirit.
                </p>
            </div>

            <nav className="flex justify-center mb-8">
                <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-full shadow-sm border border-gray-200 flex gap-1">
                    {allTabs.map((tab) => (
                        <NavLink
                            key={tab.path}
                            to={tab.path}
                            className={({ isActive }) =>
                                clsx(
                                    "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300",
                                    isActive
                                        ? "bg-np-navy text-white shadow-md ring-2 ring-np-navy/20"
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
