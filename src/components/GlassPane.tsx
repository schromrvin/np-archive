import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface GlassPaneProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
    className?: string;
    dark?: boolean;
}

export const GlassPane = React.forwardRef<HTMLDivElement, GlassPaneProps>(
    ({ children, className, dark = false, ...props }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={cn(
                    "rounded-2xl p-6 backdrop-blur-xl shadow-glass transition-all duration-300",
                    dark
                        ? "bg-slate-900/60 border border-white/10 text-white"
                        : "bg-white/60 border border-white/40 text-slate-800",
                    className
                )}
                {...props}
            >
                {children}
            </motion.div>
        );
    }
);

GlassPane.displayName = "GlassPane";
