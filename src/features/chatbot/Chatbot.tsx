import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { GlassPane } from "@/components/GlassPane";
import ReactMarkdown from "react-markdown";
import { getGeminiResponse, type ChatMessage } from "./gemini";

export function Chatbot() {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Hide on scavenger hunt page (using CSS to prevent unmounting issues)
    const isHidden = location.pathname.includes("/scavenger-hunt");

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMsg = inputValue.trim();
        setInputValue("");

        // Add user message
        const newHistory: ChatMessage[] = [
            ...messages,
            { role: "user", text: userMsg },
        ];
        setMessages(newHistory);
        setIsLoading(true);

        // Get response
        const response = await getGeminiResponse(messages, userMsg);

        // Add bot response
        setMessages([
            ...newHistory,
            { role: "model", text: response },
        ]);
        setIsLoading(false);
    };

    return (
        <div
            className={`fixed right-6 z-50 flex flex-col items-end gap-4 transition-all duration-300 ${isHidden ? "opacity-0 pointer-events-none translate-y-10" : "opacity-100 pointer-events-auto translate-y-0"
                } bottom-28 md:bottom-8`}
        >
            <AnimatePresence>
                {isOpen && !isHidden && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="origin-bottom-right"
                    >
                        <GlassPane className="w-[350px] h-[500px] flex flex-col p-0 overflow-hidden border-white/40 shadow-2xl">
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 bg-np-navy text-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-full bg-white/10 text-np-gold ring-1 ring-white/20">
                                        <Bot size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">NP Assistant</h3>
                                        <p className="text-[10px] text-gray-300 font-medium tracking-wide uppercase">Powered by Gemini</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-white/10 rounded-full transition-colors text-white/80 hover:text-white"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                                {messages.length === 0 && (
                                    <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-6 space-y-3">
                                        <div className="w-16 h-16 rounded-full bg-np-navy/5 flex items-center justify-center">
                                            <Bot size={32} className="text-np-navy/40" />
                                        </div>
                                        <div>
                                            <p className="font-medium text-slate-700">Hello!</p>
                                            <p className="text-sm">I'm your NP guide. Ask me anything about the campus, history, or courses!</p>
                                        </div>
                                    </div>
                                )}
                                {messages.map((msg, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-start gap-2 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"
                                            }`}
                                    >
                                        <div
                                            className={`p-2 rounded-full shrink-0 shadow-sm ${msg.role === "user" ? "bg-white" : "bg-np-navy"
                                                }`}
                                        >
                                            {msg.role === "user" ? (
                                                <User size={14} className="text-np-navy" />
                                            ) : (
                                                <Bot size={14} className="text-np-gold" />
                                            )}
                                        </div>
                                        <div
                                            className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${msg.role === "user"
                                                ? "bg-np-navy text-white rounded-tr-none"
                                                : "bg-white border border-gray-100 text-slate-800 rounded-tl-none"
                                                }`}
                                        >
                                            {msg.role === "user" ? (
                                                msg.text
                                            ) : (
                                                <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0">
                                                    <ReactMarkdown
                                                        components={{
                                                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-1" {...props} />,
                                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-1" {...props} />,
                                                            li: ({ node, ...props }) => <li className="my-0.5" {...props} />,
                                                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                            strong: ({ node, ...props }) => <strong className="font-bold text-slate-900" {...props} />,
                                                        }}
                                                    >
                                                        {msg.text}
                                                    </ReactMarkdown>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-full bg-np-navy shrink-0 shadow-sm">
                                            <Bot size={14} className="text-np-gold" />
                                        </div>
                                        <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                                            <div className="flex gap-1">
                                                <span className="w-1.5 h-1.5 bg-np-navy/40 rounded-full animate-bounce" />
                                                <span className="w-1.5 h-1.5 bg-np-navy/40 rounded-full animate-bounce [animation-delay:0.2s]" />
                                                <span className="w-1.5 h-1.5 bg-np-navy/40 rounded-full animate-bounce [animation-delay:0.4s]" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-3 border-t border-gray-200 bg-white shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
                                <form
                                    onSubmit={handleSendMessage}
                                    className="flex items-center gap-2 bg-gray-50 rounded-full px-1 pl-4 py-1 border border-gray-200 focus-within:ring-2 focus-within:ring-np-navy/20 focus-within:border-np-navy transition-all"
                                >
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Ask about NP..."
                                        className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-gray-400 text-slate-800 min-w-0"
                                        disabled={isLoading}
                                    />
                                    <button
                                        type="submit"
                                        disabled={isLoading || !inputValue.trim()}
                                        className="p-2 rounded-full bg-np-navy text-white hover:bg-np-navy/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                                    >
                                        <Send size={16} />
                                    </button>
                                </form>
                            </div>
                        </GlassPane>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="h-14 w-14 rounded-full bg-np-navy text-white shadow-lg flex items-center justify-center hover:shadow-xl hover:bg-np-navy/90 transition-all border-2 border-white/20"
            >
                {isOpen ? <X size={28} /> :
                    <div className="relative">
                        <MessageCircle size={28} />
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-np-gold opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-np-gold"></span>
                        </span>
                    </div>
                }
            </motion.button>
        </div>
    );
}
