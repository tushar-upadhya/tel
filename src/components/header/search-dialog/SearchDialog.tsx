import { columns } from "@/components/data-table/columns";
import { DataTable } from "@/components/data-table/data-table";
import ContactCardSkeleton from "@/components/loading-skeleton/ContactCardSkeleton";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { fetchGlobalSearchContacts } from "@/service/api-service";
import { useQuery } from "@tanstack/react-query";
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
            if (!isOpen) {
                clearSearchQueries();
            }
        },
        [setOpen, clearSearchQueries]
    );

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <SearchBar
                    query={fullNameQuery}
                    onChange={(e) => handleSearchChange(e, "fullName")}
                    placeholder="Search by name..."
                    className="w-[10rem] sm:w-full text-sm cursor-pointer sm:text-base"
                />
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl p-3 sm:p-4 bg-white rounded-lg">
                {/* <DialogTitle className="mb-3 text-base font-semibold sm:text-lg">
                    Search Contacts
                </DialogTitle> */}

                <div className="space-y-3 w-[17rem] sm:w-full">
                    <div>
                        <label
                            htmlFor="fullName"
                            className="block py-2 text-xs font-medium text-gray-700"
                        >
                            Full Name
                        </label>
                        <Input
                            id="fullName"
                            value={fullNameQuery}
                            onChange={(e) => handleSearchChange(e, "fullName")}
                            placeholder="Enter full name..."
                            className="w-full mt-1 text-xs capitalize"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="designation"
                            className="block py-2 text-xs font-medium text-gray-700"
                        >
                            Designation
                        </label>
                        <Input
                            id="designation"
                            value={designationQuery}
                            onChange={(e) =>
                                handleSearchChange(e, "designation")
                            }
                            placeholder="Enter designation..."
                            className="w-full mt-1 text-xs capitalize"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="department"
                            className="block py-2 text-xs font-medium text-gray-700"
                        >
                            Department
                        </label>
                        <Input
                            id="department"
                            value={departmentQuery}
                            onChange={(e) =>
                                handleSearchChange(e, "department")
                            }
                            placeholder="Enter department..."
                            className="w-full mt-1 text-xs capitalize"
                        />
                    </div>
                </div>
                {isLoading && (
                    <div className="flex items-center justify-center mt-3">
                        <ContactCardSkeleton />
                    </div>
                )}
                {error && (
                    <p className="p-2 mt-3 text-xs font-semibold text-center text-red-500 bg-red-100 rounded-sm sm:p-3 md:p-4 sm:text-sm md:text-base">
                        {(error as Error).message}
                    </p>
                )}
                {!isLoading && data.length > 0 && (
                    <div className="mt-3 overflow-y-auto">
                        <div className="container w-[17rem] sm:w-full py-3 mx-auto">
                            <DataTable columns={columns} data={data} />
                        </div>
                    </div>
                )}
                {!isLoading && data.length === 0 && (
                    <p className="p-2 mt-3 text-xs font-semibold text-center text-red-500 bg-red-100 rounded-sm sm:p-3 md:p-4 sm:text-sm md:text-base">
                        No results found
                    </p>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SearchDialog;
