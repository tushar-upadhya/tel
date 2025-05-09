import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        initialState: {
            pagination: {
                pageSize: 4,
            },
        },
    });

    return (
        <div className="w-full max-w-screen-xl mx-auto sm:px-6">
            <div className="overflow-x-auto scrollbar-hidden">
                <div className="md:max-h-[calc(100vh-200px)] md:overflow-y-auto">
                    <Table
                        className="w-full border border-gray-200 table-auto"
                        role="grid"
                        aria-label="Contact list table"
                    >
                        <TableHeader className="sticky top-0 z-10 bg-gray-50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead
                                            key={header.id}
                                            className="px-2 py-2 text-xs font-semibold text-gray-700 whitespace-nowrap sm:whitespace-normal"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                        className="hover:bg-gray-100"
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="px-2 py-2 text-xs whitespace-nowrap sm:whitespace-normal"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-xs text-center text-red-500"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
            <div className="flex items-center justify-center py-4 space-x-2">
                <Button
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="cursor-pointer text-slate-800 bg-[#FA7275]/20 hover:text-white rounded-md hover:bg-[#FA7275] font-semibold transition-all duration-300 text-xs px-2 sm:px-3"
                    aria-label="Go to previous page"
                >
                    Previous
                </Button>
                <Button
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="cursor-pointer text-slate-800 bg-[#FA7275]/20 hover:text-white rounded-md hover:bg-[#FA7275] transition-all duration-300 text-xs px-2 sm:px-3"
                    aria-label="Go to next page"
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
