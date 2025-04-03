import { Button } from "@/components/ui/button";
import { addToFavorites, removeFromFavorites } from "@/features/favoritesSlice";
import { useToast } from "@/hooks/use-toast";
import { RootState } from "@/store";
import { BookmarkPlus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface FavoriteToggleProps {
    id: string;
    fullName: string;
    department: string;
    contactList: string[];
    designation: string;
}

const FavoriteToggle = ({
    id,
    fullName,
    department,
    contactList,
    designation,
}: FavoriteToggleProps) => {
    const dispatch = useDispatch();
    const favorites = useSelector(
        (state: RootState) => state.favorites.favorites
    );
    const { toast } = useToast();

    const isFavorite = favorites.some((favorite) => favorite.id === id);

    const toggleFavorite = () => {
        const contact = {
            id,
            fullName: fullName.trim(),
            department: department.trim(),
            contactList,
            designation: designation.trim(),
        };

        if (isFavorite) {
            dispatch(removeFromFavorites(id));
            toast({
                title: "Removed from Favorites",
                description: `${fullName} has been removed from your favorites.`,
                variant: "destructive",
            });
        } else {
            dispatch(addToFavorites(contact));
            toast({
                title: "Added to Favorites",
                description: `${fullName} has been added to your favorites.`,
                variant: "default",
            });
        }
    };

    return (
        <Button
            variant="ghost"
            size="sm"
            onClick={toggleFavorite}
            className="px-3 rounded-full hover:text-red-800"
        >
            <BookmarkPlus
                fill={isFavorite ? "currentColor" : "none"}
                size={20}
                className="w-5 h-5 lg:w-6 lg:h-6 animate-pulse"
            />
        </Button>
    );
};

export default FavoriteToggle;
