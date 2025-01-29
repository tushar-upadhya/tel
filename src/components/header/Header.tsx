import { setSearchQuery } from "@/features/search/searchQuerySlice";
import { RootState } from "@/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddToFav from "./add-to-fav/AddToFav";
import Logo from "./logo/Logo";
import SearchBar from "./search-bar/SearchBar";

const Header = () => {
    const searchQuery = useSelector(
        (state: RootState) => state.searchQuery.query
    );
    const dispatch = useDispatch();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <header className="w-full bg-[#FEF9F5]">
            <div className="container flex flex-wrap items-center justify-between p-4 mx-auto">
                {/* Logo */}
                <Logo />

                <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:mt-0">
                    <div className="flex">
                        {/* Search Bar */}
                        <SearchBar
                            query={searchQuery}
                            onChange={handleSearchChange}
                            placeholder="Search contacts..."
                            className="text-sm sm:text-base justify-start w-full"
                        />
                        {/* Add to Favorites */}
                        <AddToFav />
                    </div>
                </div>

                {/* Login-Signup Dialog */}
                {/* <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Avatar className="cursor-pointer">
                            <AvatarImage
                                src="https://via.placeholder.com/150"
                                alt="User Avatar"
                            />
                            <AvatarFallback className="bg-black">
                                <User className="text-white" />
                            </AvatarFallback>
                        </Avatar>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogClose />
                        </DialogHeader>
                        <LogInSignup />
                    </DialogContent>
                </Dialog> */}
            </div>
        </header>
    );
};

export default Header;
