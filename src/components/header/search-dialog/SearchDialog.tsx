import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import ContactCardSkeleton from "@/components/loading-skeleton/ContactCardSkeleton";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetchGlobalSearchContacts } from "@/service/api-service";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import React, { useCallback } from "react";
import { SearchItem } from "../Header";
import SearchBar from "../search-bar/SearchBar";

interface SearchDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    fullNameQuery: string;
    designationQuery: string;
    departmentQuery: string;
    debouncedFullNameQuery: string;
    debouncedDesignationQuery: string;
    debouncedDepartmentQuery: string;
    handleSearchChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        field: string
    ) => void;
    clearSearchQueries: () => void;
}

const SearchInput = ({
    label,
    id,
    value,
    onChange,
}: {
    label: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
    const isValid = value.trim().length >= 3;
    return (
        <div className="relative">
            <label
                htmlFor={id}
                className="block py-2 text-xs font-medium text-gray-700"
            >
                {label}
            </label>
            <Input
                id={id}
                value={value}
                onChange={onChange}
                placeholder={`${label.toLowerCase()} (min: 3 characters)`}
                className="w-full pr-10 -mt-1 text-xs"
            />
            {isValid && (
                <CheckCircle
                    size={18}
                    className="absolute text-green-500 right-2 top-9 animate-bounce"
                />
            )}
        </div>
    );
};

const SearchDialog: React.FC<SearchDialogProps> = ({
    open,
    setOpen,
    fullNameQuery,
    designationQuery,
    departmentQuery,
    debouncedFullNameQuery,
    debouncedDesignationQuery,
    debouncedDepartmentQuery,
    handleSearchChange,
    clearSearchQueries,
}) => {
    const {
        data = [],
        isLoading,
        error,
    } = useQuery<SearchItem[], Error>({
        queryKey: [
            "globalSearchContacts",
            debouncedFullNameQuery,
            debouncedDesignationQuery,
            debouncedDepartmentQuery,
        ],
        queryFn: () =>
            fetchGlobalSearchContacts(
                debouncedFullNameQuery,
                debouncedDesignationQuery,
                debouncedDepartmentQuery
            ),
        enabled:
            !!debouncedFullNameQuery ||
            !!debouncedDesignationQuery ||
            !!debouncedDepartmentQuery,
        staleTime: 5 * 60 * 1000,
    });

    const handleOpenChange = useCallback(
        (isOpen: boolean) => {
            setOpen(isOpen);
            if (!isOpen) clearSearchQueries();
        },
        [setOpen, clearSearchQueries]
    );

    const hasSearchQuery =
        debouncedFullNameQuery.trim() ||
        debouncedDesignationQuery.trim() ||
        debouncedDepartmentQuery.trim();

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <SearchBar
                    query={fullNameQuery}
                    onChange={(e) => handleSearchChange(e, "fullName")}
                    placeholder="Search"
                    className="w-[10rem] sm:w-full text-sm cursor-pointer sm:text-base"
                />
            </DialogTrigger>

            <DialogContent className="max-w-[95vw] sm:max-w-2xl p-3 sm:p-4 bg-white rounded-lg">
                <DialogTitle className="mb-3 text-base font-semibold sm:text-lg">
                    Search Contacts
                </DialogTitle>

                <div className="space-y-3 w-[17rem] sm:w-full">
                    <SearchInput
                        label="Full Name"
                        id="fullName"
                        value={fullNameQuery}
                        onChange={(e) => handleSearchChange(e, "fullName")}
                    />
                    <SearchInput
                        label="Designation"
                        id="designation"
                        value={designationQuery}
                        onChange={(e) => handleSearchChange(e, "designation")}
                    />
                    <SearchInput
                        label="Department"
                        id="department"
                        value={departmentQuery}
                        onChange={(e) => handleSearchChange(e, "department")}
                    />
                </div>

                {/* States */}
                <div className="mt-3">
                    {isLoading && (
                        <div className="flex items-center justify-center">
                            <ContactCardSkeleton />
                        </div>
                    )}

                    {error && (
                        <p className="p-2 text-xs font-semibold text-center text-red-500 bg-red-100 rounded-sm sm:p-3 sm:text-sm md:text-base">
                            {error.message}
                        </p>
                    )}

                    {!isLoading && data.length > 0 && (
                        <div className="mt-3 overflow-y-hidden w-[19.5rem] sm:w-full mx-auto">
                            <DataTable columns={columns} data={data} />
                        </div>
                    )}

                    {!isLoading && data.length === 0 && hasSearchQuery && (
                        <p className="p-2 text-xs font-semibold text-center text-red-500 bg-red-100 rounded-sm sm:p-3 sm:text-sm md:text-base">
                            No results found
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchDialog;
