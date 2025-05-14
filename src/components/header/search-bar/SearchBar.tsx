import { Input } from "@/components/ui/input";
import { SearchBarProps } from "@/lib/types/type";
import { SearchIcon } from "lucide-react";
import React from "react";

const SearchBar: React.FC<SearchBarProps> = React.memo(
    ({
        placeholder = "Looking for a familiar name?",
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
                <div className="relative w-full min-w-0">
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
                        className={`w-full pl-8 pr-3 py-2 text-xs sm:text-sm border border-gray-300 placeholder:text-[0.75rem] placeholder:sm:text-sm placeholder:md:text-base placeholder:lg:text-lg ${inputClassName}`}
                    />
                </div>
            </div>
        );
    }
);

export default SearchBar;
