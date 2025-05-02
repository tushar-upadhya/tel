import { ColumnDef } from "@tanstack/react-table";
import { SearchItem } from "../header/Header";
import CopyNumber from "../shared/CopyNumber";

export const columns: ColumnDef<SearchItem>[] = [
    {
        accessorKey: "fullName",
        header: "Name",
        cell: ({ row }) => (
            <div className="text-gray-700 text-xs min-w-[60px] max-w-[100px] truncate">
                {row.getValue("fullName")}
            </div>
        ),
    },
    {
        accessorKey: "designation",
        header: "Designation",
        cell: ({ row }) => (
            <div className="text-gray-700 text-xs min-w-[50px] max-w-[80px] truncate">
                {row.getValue("designation")}
            </div>
        ),
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => (
            <div className="text-gray-700 text-xs min-w-[50px] max-w-[80px] truncate">
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
                return <div className="text-xs text-gray-700">N/A</div>;
            const numbers = (contact as string)
                .split(",")
                .map((num) => num.trim());
            return (
                <div className="flex flex-col gap-1 min-w-[80px]">
                    {numbers.map((number, index) => (
                        <CopyNumber key={index} number={number} />
                    ))}
                </div>
            );
        },
    },
];
