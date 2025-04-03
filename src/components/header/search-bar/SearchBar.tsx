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

        if (onSearch) {
            onSearch(value);
        }
    };

    return (
        <div
            className={`flex items-center justify-center w-full  ${className}`}
        >
            <div className="relative max-w-fit">
                <Input
                    type="text"
                    placeholder={placeholder}
                    value={query}
                    onChange={handleChange}
                    className={`py-2 px-3 sm:py-2.5 sm:px-4 text-sm sm:text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${inputClassName}`}
                />
                <SearchIcon
                    className={`absolute transform -translate-y-1/2 text-gray-500 right-2 sm:right-3 top-1/2 ${iconClassName}`}
                    size={18}
                />
            </div>
        </div>
    );
};

export default SearchBar;
