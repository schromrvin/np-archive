import { GlassPane } from "@/components/GlassPane";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
    title: string;
    description: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
    return (
        <div className="min-h-screen p-6 flex flex-col justify-center items-center pb-24">
            <GlassPane className="max-w-md w-full text-center space-y-4">
                <h1 className="text-3xl font-bold text-np-navy tracking-tight">{title}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{description}</p>
                <div className="pt-4">
                    <span className="inline-block px-4 py-2 bg-gray-100 rounded-full text-xs font-mono text-gray-500 uppercase tracking-widest">In Development</span>
                </div>
                <div className="pt-8">
                    <Link to="/" className="text-np-gold font-medium hover:underline flex items-center justify-center gap-2">
                        <ArrowLeft className="size-4" /> Back Home
                    </Link>
                </div>
            </GlassPane>
        </div>
    );
}
