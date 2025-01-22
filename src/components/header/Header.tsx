import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import React from "react";
import AddToFav from "./add-to-fav/AddToFav";
import LogInSignup from "./login-signup/LoginSignup";
import Logo from "./logo/Logo";
import SearchBar from "./search-bar/SearchBar";

const Header: React.FC = () => {
  return (
    <header className="w-full bg-[#FEF9F5]">
      <div className="container flex flex-wrap items-center justify-between p-4 mx-auto">
        {/* Logo */}
        <Logo />

        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 md:mt-0">
          <div className="flex">
            {/* Search Bar */}
            <SearchBar />
            {/* Add to Favorites */}
            <AddToFav />
          </div>
        </div>

        {/* Login-Signup Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Avatar className="cursor-pointer">
              {/* Avatar Image */}
              <AvatarImage
                src="https://via.placeholder.com/150"
                alt="User Avatar"
              />
              {/* Fallback if no image is available */}
              <AvatarFallback className="bg-black">
              <User className="text-white"/>
              </AvatarFallback>
            </Avatar>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogClose />
            </DialogHeader>
            <LogInSignup />
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
