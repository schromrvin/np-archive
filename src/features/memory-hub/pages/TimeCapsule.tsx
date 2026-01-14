
import { useState } from "react";
import { Plus } from "lucide-react";
import { CapsuleCard } from "../components/CapsuleCard";
import { CreateCapsuleModal } from "../components/CreateCapsuleModal";
import { MOCK_CAPSULES } from "../data";
import type { Capsule } from "../types";

export function TimeCapsule() {
    const [capsules, setCapsules] = useState<Capsule[]>(MOCK_CAPSULES);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const handleCreateCapsule = (newCapsule: Capsule) => {
        setCapsules([newCapsule, ...capsules]);
        setIsCreateModalOpen(false);
    };

    return (
        <div className="max-w-5xl mx-auto">
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-indigo-900 to-purple-900 rounded-3xl p-8 mb-8 text-white relative overflow-hidden shadow-xl">
                <div className="absolute top-0 right-0 p-12 opacity-10">
                    <svg viewBox="0 0 100 100" className="w-64 h-64 fill-current"><circle cx="50" cy="50" r="50" /></svg>
                </div>

                <div className="relative z-10 max-w-xl">
                    <h2 className="text-3xl font-bold mb-4">Your Time Archive</h2>
                    <p className="text-indigo-200 mb-6">
                        Preserve your memories for the future. Create digital time capsules that unlock on special dates, ensuring your stories live on.
                    </p>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        className="bg-white text-indigo-900 px-6 py-3 rounded-full font-bold shadow-lg hover:bg-indigo-50 hover:scale-105 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Create New Capsule
                    </button>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {capsules.map(capsule => (
                    <CapsuleCard key={capsule.id} capsule={capsule} />
                ))}

                {/* 'Add New' Placeholder Card */}
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="group h-64 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-indigo-400 hover:text-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer"
                >
                    <div className="bg-gray-100 p-4 rounded-full mb-3 group-hover:bg-indigo-100 transition-colors">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="font-medium">Seal a new memory</span>
                </button>
            </div>

            <CreateCapsuleModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
                onSubmit={handleCreateCapsule}
            />
        </div>
    );
}
