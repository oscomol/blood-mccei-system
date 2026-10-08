import React from "react";
import { cn } from "@/lib/utils";

const RingSpinner = ({ className }) => (
    <svg
        className={cn("size-5 animate-spin", className)}
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
    >
        {/* faint track */}
        <circle
            cx="12"
            cy="12"
            r="9"
            stroke="currentColor"
            strokeWidth="3"
            className="opacity-20"
        />
        {/* moving arc */}
        <path
            d="M21 12a9 9 0 0 0-9-9"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
        />
    </svg>
);

const LoadingSpinner = ({
    show = false,
    label = "Loading",
    blockInteraction = false,
    className,
}) => {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-hidden={!show}
            className={cn(
                "absolute inset-0 z-10 flex items-center justify-center",
                // let clicks pass through unless explicitly blocked
                !show || !blockInteraction ? "pointer-events-none" : "",
                className
            )}
        >
            <div
                className={cn(
                    "flex items-center gap-3 rounded-full bg-white px-5 py-2.5",
                    "shadow-lg shadow-slate-900/10 ring-1 ring-slate-200",
                    "transition-all duration-200 ease-out",
                    show
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-1 scale-95 opacity-0"
                )}
            >
                <RingSpinner className="text-blue-600" />
                <span className="text-sm font-medium text-slate-600">
                    {label}
                    <span className="inline-flex w-4 justify-start">
                        <span className="animate-pulse">...</span>
                    </span>
                </span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
