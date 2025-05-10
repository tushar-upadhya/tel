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
                className="block py-2 text-xs font-medium text-gray-700 sm:text-sm"
            >
                {label}
            </label>
            <Input
                id={id}
                value={value}
                onChange={onChange}
                placeholder={`${label.toLowerCase()} (min: 3 characters)`}
                className="w-full px-3 pr-10 text-xs border-gray-300 rounded-full sm:px-4 sm:text-sm focus:ring-2 focus:ring-blue-500"
            />
            {isValid && (
                <CheckCircle
                    size={18}
                    className="absolute mt-2 text-green-500 -translate-y-1/4 right-2 top-1/2 animate-bounce"
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
            <DialogTrigger className="flex w-full sm:w-auto">
                <SearchBar
                    query={fullNameQuery}
                    onChange={(e) => handleSearchChange(e, "fullName")}
                    placeholder="Find someone"
                    className="w-full max-w-xs text-sm border-gray-300 rounded-full cursor-pointer sm:max-w-sm sm:text-base focus:ring-2 focus:ring-blue-500"
                />
            </DialogTrigger>

            <DialogContent className="w-[90vw] sm:max-w-3xl p-4 sm:p-6 bg-white rounded-lg max-h-[80vh] flex flex-col">
                <DialogTitle className="mb-4 text-base font-semibold sm:text-lg">
                    🔍 Explore Team Directory
                </DialogTitle>

                <div className="w-full max-w-full space-y-3">
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

                <div className="flex-1 mt-3 overflow-y-auto">
                    {isLoading && (
                        <div className="flex items-center justify-center">
                            <ContactCardSkeleton />
                        </div>
                    )}

                    {error && (
                        <p className="p-3 text-sm text-center text-red-500 bg-red-100 rounded-sm">
                            {error.message}
                        </p>
                    )}

                    {!isLoading && data.length > 0 && (
                        <div className="overflow-x-auto">
                            <div className="w-full">
                                <DataTable columns={columns} data={data} />
                            </div>
                        </div>
                    )}

                    {!isLoading && data.length === 0 && hasSearchQuery && (
                        <p className="p-3 text-sm text-center text-red-500 bg-red-100 rounded-sm">
                            No results found
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SearchDialog;
