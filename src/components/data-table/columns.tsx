import { ColumnDef } from "@tanstack/react-table";
import { SearchItem } from "../header/Header";
import CopyNumber from "../shared/CopyNumber";

export const columns: ColumnDef<SearchItem>[] = [
    {
        id: "mobileView",
        header: () => null,
        cell: ({ row }) => {
            const fullName = row.getValue("fullName") as string;
            const designation = row.getValue("designation") as string;
            const department = row.getValue("department") as string;
            const contact = row.getValue("contactList") as string | undefined;

            // Render only on mobile screens
            return (
                <div className="flex items-start justify-between gap-2 text-xs sm:hidden">
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-700 max-w-[120px] truncate">
                            {fullName}
                        </span>
                        <span className="text-gray-700 max-w-[120px]">
                            {designation}
                        </span>
                        <span className="text-gray-700 max-w-[120px]">
                            {department}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1 ml-1 min-w-[80px]">
                        {contact ? (
                            contact
                                .split(",")
                                .map((num) => num.trim())
                                .map((number, index) => (
                                    <CopyNumber key={index} number={number} />
                                ))
                        ) : (
                            <span className="text-gray-700">N/A</span>
                        )}
                    </div>
                </div>
            );
        },
    },

    // desktop view columns
    {
        accessorKey: "fullName",
        header: () => <span className="hidden sm:block">Name</span>,
        cell: ({ row }) => (
            <div className="hidden sm:block text-gray-700 text-xs min-w-[60px] max-w-[100px] font-bold">
                {row.getValue("fullName")}
            </div>
        ),
    },
    {
        accessorKey: "designation",
        header: () => <span className="hidden sm:block">Designation</span>,
        cell: ({ row }) => (
            <div className="hidden sm:block text-gray-700 text-xs min-w-[50px] max-w-[80px]">
                {row.getValue("designation")}
            </div>
        ),
    },
    {
        accessorKey: "department",
        header: () => <span className="hidden sm:block">Department</span>, // Hide header on mobile
        cell: ({ row }) => (
            <div className="hidden sm:block text-gray-700 text-xs min-w-[50px] max-w-[80px]">
                {row.getValue("department")}
            </div>
        ),
    },
    {
        accessorKey: "contactList",
        header: () => <span className="hidden sm:block">Contact</span>, // Hide header on mobile
        cell: ({ row }) => {
            const contact = row.getValue("contactList") as string | undefined;
            return (
                <div className="hidden sm:block flex-col gap-1 min-w-[80px]">
                    {contact ? (
                        contact
                            .split(",")
                            .map((num) => num.trim())
                            .map((number, index) => (
                                <CopyNumber key={index} number={number} />
                            ))
                    ) : (
                        <div className="text-xs text-gray-700">N/A</div>
                    )}
                </div>
            );
        },
    },
];
