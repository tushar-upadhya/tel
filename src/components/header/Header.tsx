import { setSearchQuery } from "@/features/search/searchQuerySlice";
import { useDebounce } from "@/hooks/use-debounce";
import React, { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import AddToFav from "./add-to-fav/AddToFav";
import Logo from "./logo/Logo";
import SearchDialog from "./search-dialog/SearchDialog";

export interface SearchItem {
    id: string;
    fullName: string;
    designation: string;
    department: string;
    contactList: string | null;
}

const Header: React.FC = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [fullNameQuery, setFullNameQuery] = useState("");
    const [designationQuery, setDesignationQuery] = useState("");
    const [departmentQuery, setDepartmentQuery] = useState("");

    const debouncedFullNameQuery = useDebounce(fullNameQuery, 300);
    const debouncedDesignationQuery = useDebounce(designationQuery, 300);
    const debouncedDepartmentQuery = useDebounce(departmentQuery, 300);

    const handleSearchChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
            const value = e.target.value.trim();
            if (field === "fullName") setFullNameQuery(value);
            if (field === "designation") setDesignationQuery(value);
            if (field === "department") setDepartmentQuery(value);
        },
        []
    );

    const clearSearchQueries = useCallback(() => {
        setFullNameQuery("");
        setDesignationQuery("");
        setDepartmentQuery("");
        dispatch(setSearchQuery(""));
    }, [dispatch]);

    return (
        <header className="w-full bg-[#C1BAA1]">
            <div className="container px-4 py-3 mx-auto">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Logo />
                    <div className="flex flex-wrap items-center justify-between w-full gap-2 md:w-auto">
                        <div className="flex-1 min-w-0">
                            <SearchDialog
                                open={open}
                                setOpen={setOpen}
                                fullNameQuery={fullNameQuery}
                                designationQuery={designationQuery}
                                departmentQuery={departmentQuery}
                                debouncedFullNameQuery={debouncedFullNameQuery}
                                debouncedDesignationQuery={
                                    debouncedDesignationQuery
                                }
                                debouncedDepartmentQuery={
                                    debouncedDepartmentQuery
                                }
                                handleSearchChange={handleSearchChange}
                                clearSearchQueries={clearSearchQueries}
                            />
                        </div>
                        <div className="shrink-0">
                            <AddToFav />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
