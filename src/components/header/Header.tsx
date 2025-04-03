import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { setSearchQuery } from "@/features/search/searchQuerySlice";
import { useDebounce } from "@/hooks/use-debounce";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToFav from "./add-to-fav/AddToFav";
import Logo from "./logo/Logo";

// Assuming this is your fetch function (adjust as per your API)
const fetchGlobalSearchContacts = async (query: string) => {
    const response = await fetch(`/api/search?query=${query}`); // Replace with your API endpoint
    if (!response.ok) throw new Error("Failed to fetch search results");
    return response.json();
};

interface SearchItem {
    id: string;
    name: string;
}

const categories = [
    { value: "fullName", label: "Full Name" },
    { value: "designation", label: "Designation" },
    { value: "department", label: "Department" },
];

const Header = React.memo(() => {
    const dispatch = useDispatch();
    const searchQuery = useSelector(
        (state: RootState) => state.searchQuery.query
    );
    const [searchCategory, setSearchCategory] =
        React.useState<string>("fullName");
    const [open, setOpen] = React.useState<boolean>(false);
    const debouncedQuery = useDebounce(searchQuery, 300);

    // Use React Query to fetch data
    const { data, isLoading, error } = useQuery<SearchItem[], Error>({
        queryKey: ["globalSearchContacts", debouncedQuery, searchCategory],
        queryFn: () => fetchGlobalSearchContacts(debouncedQuery),
        enabled: debouncedQuery.length >= 3, // Only fetch when query length is 3 or more
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
    });

    const handleSearchChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setSearchQuery(e.target.value));
        },
        [dispatch]
    );

    return (
        <header className="w-full bg-[#C1BAA1]">
            <div className="container flex flex-wrap items-center justify-between p-4 mx-auto">
                <Logo />
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                {/* Uncomment and adjust if you have a SearchBar component */}
                                {/* <button className="w-full">
                                    <SearchBar
                                        query={searchQuery}
                                        onChange={handleSearchChange}
                                        placeholder="Search..."
                                        className="w-full text-sm cursor-pointer sm:text-base"
                                    />
                                </button> */}
                            </DialogTrigger>
                            <DialogContent className="max-w-md p-6 bg-white rounded-lg shadow-lg">
                                <DialogTitle className="mb-4 text-lg font-semibold capitalize">
                                    Searching by {searchCategory}
                                </DialogTitle>
                                <Select
                                    value={searchCategory}
                                    onValueChange={setSearchCategory}
                                >
                                    <SelectTrigger className="w-full mb-4">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((category) => (
                                            <SelectItem
                                                key={category.value}
                                                value={category.value}
                                            >
                                                {category.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Input
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder={`Search by ${searchCategory}...`}
                                    className="w-full"
                                />
                                {isLoading && <p>Loading...</p>}
                                {error && (
                                    <p className="text-red-500">
                                        Error: {error.message}
                                    </p>
                                )}
                                {data && searchQuery.length >= 3 && (
                                    <div className="mt-4">
                                        {data.length > 0 ? (
                                            data.map((item: SearchItem) => (
                                                <p
                                                    key={item.id}
                                                    className="text-gray-700"
                                                >
                                                    {item.name}
                                                </p>
                                            ))
                                        ) : (
                                            <p>No results found</p>
                                        )}
                                    </div>
                                )}
                            </DialogContent>
                        </Dialog>
                        <AddToFav />
                    </div>
                </div>
            </div>
        </header>
    );
});

export default Header;
