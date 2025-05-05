import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { BookmarkPlus, Home } from "lucide-react";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const AddToFav: React.FC = () => {
    const location = useLocation();
    const isFavoritesPage = location.pathname === "/favorites";

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="link"
                        size="icon"
                        className="text-[#28293E]"
                        asChild
                    >
                        <Link to={isFavoritesPage ? "/" : "/favorites"}>
                            {isFavoritesPage ? (
                                <Home size={20} />
                            ) : (
                                <BookmarkPlus size={20} />
                            )}
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{isFavoritesPage ? "Go to Home" : "View Favorites"}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
};

export default AddToFav;
