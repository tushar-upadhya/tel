import { Input } from "@/components/ui/input";
import { SearchBarProps } from "@/lib/types/type";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchBar: React.FC<SearchBarProps> = React.memo(
    ({
        placeholder = "Search...",
        className = "",
        inputClassName = "",
        iconClassName = "",
        query,
        onChange,
    }) => {
        return (
            <div
                className={`flex items-center justify-center w-full ${className}`}
            >
                <div className="relative w-full">
                    <label htmlFor="search" className="sr-only">
                        Search
                    </label>
                    <SearchIcon
                        className={`absolute left-2 top-2.5 h-4 w-4 text-gray-400 ${iconClassName}`}
                        aria-hidden="true"
                    />
                    <Input
                        id="search"
                        type="text"
                        placeholder={placeholder}
                        value={query}
                        onChange={onChange}
                        className={`w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C1BAA1] ${inputClassName}`}
                    />
                </div>
            </div>
        );
    }
);

export default SearchBar;
