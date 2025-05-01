import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { setSearchQuery } from "@/features/search/searchQuerySlice";
import { useDebounce } from "@/hooks/use-debounce";
import { fetchData } from "@/service/api-service";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { DataTable } from "../data-table/data-table";
import CopyNumber from "../shared/CopyNumber";
import AddToFav from "./add-to-fav/AddToFav";
import Logo from "./logo/Logo";
import SearchBar from "./search-bar/SearchBar";

interface SearchItem {
    id: string;
    fullName: string;
    designation: string;
    department: string;
    contactList: string | null;
}

interface ApiResponseItem {
    id: number;
    fullName: string;
    designation: string;
    department: string;
    contactList: string | null;
    fax: string | null;
    officialContactList: string | null;
    resedentialContactList: string | null;
    address: string | null;
    privacy: string;
    email: string | null;
    level: {
        id: number;
        name: string;
        privacy: string;
        status: string;
        color: string | null;
        institute: string;
        seqNo: string | null;
        parent: any;
    };
}

const columns: ColumnDef<SearchItem>[] = [
    {
        accessorKey: "fullName",
        header: "Name",
        cell: ({ row }) => (
            <div className="text-gray-700 text-xs sm:text-sm min-w-[90px] max-w-[180px] truncate">
                {row.getValue("fullName")}
            </div>
        ),
    },
    {
        accessorKey: "designation",
        header: "Designation",
        cell: ({ row }) => (
            <div className="text-gray-700 text-xs sm:text-sm min-w-[80px] max-w-[140px] truncate">
                {row.getValue("designation")}
            </div>
        ),
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
            <div className="text-gray-700 text-xs sm:text-sm min-w-[80px] max-w-[140px] truncate">
                {row.getValue("department")}
            </div>
        ),
    },
    {
        accessorKey: "contactList",
        header: "Contact",
        cell: ({ row }) => {
            const contact = row.getValue("contactList");
            if (!contact)
                return (
                    <div className="text-xs text-gray-700 sm:text-sm">N/A</div>
                );
            const numbers = (contact as string)
                .split(",")
                .map((num) => num.trim());
            return (
                <div className="flex flex-col gap-1 min-w-[110px]">
                    {numbers.map((number, index) => (
                        <CopyNumber key={index} number={number} />
                    ))}
                </div>
            );
        },
    },
];

const Header: React.FC = () => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState<boolean>(false);
    const [fullNameQuery, setFullNameQuery] = useState<string>("");
    const [designationQuery, setDesignationQuery] = useState<string>("");
    const [departmentQuery, setDepartmentQuery] = useState<string>("");

    const debouncedFullNameQuery = useDebounce(fullNameQuery, 300);
    const debouncedDesignationQuery = useDebounce(designationQuery, 300);
    const debouncedDepartmentQuery = useDebounce(departmentQuery, 300);

    const fetchGlobalSearchContacts = async (): Promise<SearchItem[]> => {
        const params: string[] = [];
        if (debouncedFullNameQuery) {
            params.push(`fname=${encodeURIComponent(debouncedFullNameQuery)}`);
        }
        if (debouncedDesignationQuery) {
            params.push(
                `desg=${encodeURIComponent(debouncedDesignationQuery)}`
            );
        }
        if (debouncedDepartmentQuery) {
            params.push(`dept=${encodeURIComponent(debouncedDepartmentQuery)}`);
        }

        console.log(
            `Fetching search results: fname="${debouncedFullNameQuery}", desg="${debouncedDesignationQuery}", dept="${debouncedDepartmentQuery}"`
        );

        const queryString = params.length > 0 ? `?${params.join("&")}` : "";
        const url = `http://192.168.30.88:8080/telephone-directory/public/search-contacts${queryString}`;
        console.log(`API URL: ${url}`);

        try {
            const response = await fetchData<ApiResponseItem[]>(url);
            console.log("Raw API response:", response);
            const mappedData: SearchItem[] = response.map((item) => ({
                id: item.id.toString(),
                fullName: item.fullName || "Unknown",
                designation: item.designation || "Unknown",
                department: item.department || "Unknown",
                contactList: item.contactList || null,
            }));
            console.log("Mapped SearchItem data:", mappedData);
            return mappedData;
        } catch (error) {
            console.error("Error fetching search results:", error);
            throw error;
        }
    };

    const { data, isLoading, error } = useQuery<SearchItem[], Error>({
        queryKey: [
            "globalSearchContacts",
            debouncedFullNameQuery,
            debouncedDesignationQuery,
            debouncedDepartmentQuery,
        ],
        queryFn: fetchGlobalSearchContacts,
        enabled:
            debouncedFullNameQuery.length > 0 ||
            debouncedDesignationQuery.length > 0 ||
            debouncedDepartmentQuery.length > 0,
        staleTime: 5 * 60 * 1000,
    });

    if (error) {
        console.error("useQuery error:", error.message);
    }

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
            const value = e.target.value;
            console.log(`Search input changed (${field}): ${value}`);
            if (field === "fullName") setFullNameQuery(value);
            if (field === "designation") setDesignationQuery(value);
            if (field === "department") setDepartmentQuery(value);

            // Combine queries for Redux state
            const combinedQuery = [
                value && field === "fullName"
                    ? `fname:${value}`
                    : fullNameQuery
                    ? `fname:${fullNameQuery}`
                    : "",
                value && field === "designation"
                    ? `desg:${value}`
                    : designationQuery
                    ? `desg:${designationQuery}`
                    : "",
                value && field === "department"
                    ? `dept:${value}`
                    : departmentQuery
                    ? `dept:${departmentQuery}`
                    : "",
            ]
                .filter(Boolean)
                .join(",");
            dispatch(setSearchQuery(combinedQuery));
        },
        [dispatch, fullNameQuery, designationQuery, departmentQuery]
    );

    return (
        <header className="w-full bg-[#C1BAA1]">
            <div className="container flex flex-wrap items-center justify-between p-4 mx-auto">
                <Logo />
                <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:mt-0">
                    <div className="flex items-center gap-2">
                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger asChild>
                                <button className="w-full">
                                    <SearchBar
                                        query={fullNameQuery}
                                        onChange={(e) =>
                                            handleSearchChange(e, "fullName")
                                        }
                                        placeholder="Search by name..."
                                        className="w-full text-sm cursor-pointer sm:text-base"
                                    />
                                </button>
                            </DialogTrigger>
                            <DialogContent className="max-w-full sm:max-w-2xl p-4 sm:p-6 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
                                <DialogTitle className="mb-4 text-base font-semibold sm:text-lg">
                                    Search Contacts
                                </DialogTitle>
                                <div className="space-y-4">
                                    <div>
                                        <label
                                            htmlFor="fullName"
                                            className="block text-xs font-medium text-gray-700 sm:text-sm"
                                        >
                                            Full Name
                                        </label>
                                        <Input
                                            id="fullName"
                                            value={fullNameQuery}
                                            onChange={(e) =>
                                                handleSearchChange(
                                                    e,
                                                    "fullName"
                                                )
                                            }
                                            placeholder="Enter full name..."
                                            className="w-full text-xs capitalize sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="designation"
                                            className="block text-xs font-medium text-gray-700 sm:text-sm"
                                        >
                                            Designation
                                        </label>
                                        <Input
                                            id="designation"
                                            value={designationQuery}
                                            onChange={(e) =>
                                                handleSearchChange(
                                                    e,
                                                    "designation"
                                                )
                                            }
                                            placeholder="Enter designation..."
                                            className="w-full text-xs capitalize sm:text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="department"
                                            className="block text-xs font-medium text-gray-700 sm:text-sm"
                                        >
                                            Department
                                        </label>
                                        <Input
                                            id="department"
                                            value={departmentQuery}
                                            onChange={(e) =>
                                                handleSearchChange(
                                                    e,
                                                    "department"
                                                )
                                            }
                                            placeholder="Enter department..."
                                            className="w-full text-xs capitalize sm:text-sm"
                                        />
                                    </div>
                                </div>
                                {isLoading && (
                                    <p className="mt-4 text-xs text-gray-600 sm:text-sm">
                                        Loading...
                                    </p>
                                )}
                                {error && (
                                    <p className="mt-4 text-xs font-semibold text-rose-400 sm:text-sm">
                                        {error.message}
                                    </p>
                                )}
                                {data && (
                                    <div className="mt-4">
                                        {data.length > 0 ? (
                                            <div className="container py-4 mx-auto sm:py-6">
                                                <DataTable
                                                    columns={columns}
                                                    data={data}
                                                />
                                            </div>
                                        ) : (
                                            <p className="mt-4 text-xs text-gray-600 sm:text-sm">
                                                No results found
                                            </p>
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
};

export default Header;
