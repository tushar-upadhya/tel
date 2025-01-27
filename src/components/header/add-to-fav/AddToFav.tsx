import { Button } from "@/components/ui/button";
import { BookmarkPlus, Home } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const AddToFav: React.FC = () => {
    const location = useLocation();
    const isFavoritesPage = location.pathname === "/favorites";

    return (
        <div className="flex items-center">
            <Button
                variant={"link"}
                className="flex items-center gap-2 md:gap-4 text-[#28293E]"
                size={"icon"}
                asChild
            >
                <Link
                    to={isFavoritesPage ? "/" : "/favorites"}
                    className="w-5 h-5"
                >
                    {isFavoritesPage ? <Home /> : <BookmarkPlus />}
                </Link>
            </Button>
        </div>
    );
};

export default AddToFav;
