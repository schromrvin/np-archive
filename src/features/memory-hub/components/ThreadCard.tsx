
import { ArrowBigUp, MessageSquare, Clock, ArrowBigDown } from "lucide-react";
import type { Thread } from "../types";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ThreadCardProps {
    thread: Thread;
}

export function ThreadCard({ thread }: ThreadCardProps) {
    const [votes, setVotes] = useState(thread.upvotes);
    const [status, setStatus] = useState<"up" | "down" | null>(null);

    const handleVote = (type: "up" | "down") => {
        if (status === type) {
            // Toggle off
            setVotes(thread.upvotes);
            setStatus(null);
        } else if (status === null) {
            // Toggle on
            setVotes(type === "up" ? votes + 1 : votes - 1);
            setStatus(type);
        } else {
            // Switch vote
            setVotes(type === "up" ? votes + 2 : votes - 2);
            setStatus(type);
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4 hover:shadow-md transition-shadow">
            <div className="flex gap-4">
                {/* Vote Column */}
                <div className="flex flex-col items-center gap-1 bg-gray-50 p-2 rounded-lg h-fit min-w-[3rem]">
                    <button
                        onClick={() => handleVote("up")}
                        className={cn(
                            "p-1 rounded hover:bg-gray-200 transition-colors",
                            status === "up" && "text-orange-600 bg-orange-100 hover:bg-orange-200"
                        )}
                    >
                        <ArrowBigUp className={cn("w-6 h-6", status === "up" && "fill-current")} />
                    </button>
                    <span className={cn("font-bold text-sm", status === "up" ? "text-orange-600" : status === "down" ? "text-blue-600" : "text-gray-700")}>
                        {votes}
                    </span>
                    <button
                        onClick={() => handleVote("down")}
                        className={cn(
                            "p-1 rounded hover:bg-gray-200 transition-colors",
                            status === "down" && "text-blue-600 bg-blue-100 hover:bg-blue-200"
                        )}
                    >
                        <ArrowBigDown className={cn("w-6 h-6", status === "down" && "fill-current")} />
                    </button>
                </div>

                {/* Content Column */}
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
                        <img src={thread.author.avatar} alt="Avatar" className="w-5 h-5 rounded-full" />
                        <span className="font-medium text-gray-900">{thread.author.name}</span>
                        <span>•</span>
                        <span className="bg-gray-100 ml-1 px-2 py-0.5 rounded-full text-gray-600 font-medium">{thread.category}</span>
                        <span>•</span>
                        <span>{thread.timestamp}</span>
                    </div>

                    <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">{thread.title}</h3>
                    <p className="text-gray-600 mb-3 text-sm line-clamp-3">{thread.content}</p>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-1.5 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded text-xs font-semibold transition-colors">
                            <MessageSquare className="w-4 h-4" />
                            {thread.commentCount} Comments
                        </button>
                        <button className="flex items-center gap-1.5 text-gray-500 hover:bg-gray-100 px-2 py-1 rounded text-xs font-semibold transition-colors">
                            <Clock className="w-4 h-4" />
                            Watch
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
