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

            return (
                <div className="flex items-start justify-between w-[17rem] gap-6 text-xs sm:hidden">
                    <div className="flex flex-col gap-1 max-w-[140px]">
                        <span className="font-bold text-gray-700">
                            {fullName}
                        </span>
                        <span className="text-gray-700">{designation}</span>
                        <span className="text-gray-700 truncate">
                            {department}
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 min-w-[120px]">
                        {contact ? (
                            contact
                                .split(",")
                                .map((num, idx) => (
                                    <CopyNumber key={idx} number={num.trim()} />
                                ))
                        ) : (
                            <span className="text-gray-700">N/A</span>
                        )}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: "fullName",
        header: () => <span className="hidden sm:block">Name</span>,
        cell: ({ row }) => (
            <div className="hidden text-xs font-bold text-gray-700 sm:block">
                {row.getValue("fullName")}
            </div>
        ),
    },
    {
        accessorKey: "designation",
        header: () => <span className="hidden sm:block">Designation</span>,
        cell: ({ row }) => (
            <div className="hidden text-xs text-gray-700 sm:block">
                {row.getValue("designation")}
            </div>
        ),
    },
    {
        accessorKey: "department",
        header: () => <span className="hidden sm:block">Department</span>,
        cell: ({ row }) => (
            <div className="hidden text-xs text-gray-700 sm:block">
                {row.getValue("department")}
            </div>
        ),
    },
    {
        accessorKey: "contactList",
        header: () => <span className="hidden sm:block">Contact</span>,
        cell: ({ row }) => {
            const contact = row.getValue("contactList") as string | undefined;
            return (
                <div className="hidden sm:flex flex-col gap-1 min-w-[80px]">
                    {contact ? (
                        contact
                            .split(",")
                            .map((num, idx) => (
                                <CopyNumber key={idx} number={num.trim()} />
                            ))
                    ) : (
                        <div className="text-xs text-gray-700">N/A</div>
                    )}
                </div>
            );
        },
    },
];
