import { Input } from "@/Components/ui/input";
import { Search, X } from "lucide-react";
import React from "react";

const InputSearch = ({ search, setSearch, placeholder }) => {
    return (
        <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <Input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={placeholder}
                className="h-10 pl-9 pr-9 border-[#c9d3e3] placeholder:text-[#8b97ae] focus:!border-blue-500 focus:!ring-1 focus:!ring-blue-500 focus:!ring-offset-0 focus:!outline-none"
            />
            {search && (
                <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 hover:text-red-600 transition-colors"
                    aria-label="Clear search"
                >
                    <X className="size-4" />
                </button>
            )}
        </div>
    );
};

export default InputSearch;
