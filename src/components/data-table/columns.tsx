import { SearchItem } from "@/lib/types/type";
import { ColumnDef } from "@tanstack/react-table";
import CopyNumber from "../shared/CopyNumber";

export const columns: ColumnDef<SearchItem>[] = [
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
