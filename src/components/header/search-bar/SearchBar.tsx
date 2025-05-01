import { Input } from "@/components/ui/input";
import { SearchBarProps } from "@/lib/types/type";
import { SearchIcon } from "lucide-react";

const SearchBar: React.FC<SearchBarProps> = ({
    placeholder = "Search...",
    onSearch,
    className = "",
    inputClassName = "",
    iconClassName = "",
    query,
    onChange,
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(e);
        if (onSearch) onSearch(value);
    };

    return (
        <div className={`flex items-center justify-center w-full ${className}`}>
            <div className="relative w-full">
                <SearchIcon
                    className={`absolute left-2 top-2.5 w-4 h-4 text-gray-400 ${iconClassName}`}
                />
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleChange}
                    className={`pl-8 pr-3 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#C1BAA1] ${inputClassName}`}
                />
            </div>
        </div>
    );
};

export default SearchBar;
