import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RootState } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ContactCardSkeleton from "../loading-skeleton/ContactCardSkeleton";
import CopyNumber from "../shared/CopyNumber";
import FavoriteToggle from "../shared/FavoriteToggle";

interface ContactCardProps {
    id: string;
    fullName: string;
    department: string;
    contactList: string[] | string;
    designation: string;
}

interface Favorite {
    id: string;
}

const fetchFavoriteStatus = async (id: string, favorites: Favorite[]) => {
    return favorites.some((favorite) => favorite.id === id);
};

const ContactCard = ({
    id,
    fullName,
    department,
    contactList,
    designation,
}: ContactCardProps) => {
    const favorites = useSelector(
        (state: RootState) => state.favorites.favorites
    );

    const { data: isFavorite, isLoading } = useQuery({
        queryKey: ["favoriteStatus", id],
        queryFn: () => fetchFavoriteStatus(id, favorites),
        staleTime: 1000 * 60 * 5,
    });

    const contacts = Array.isArray(contactList)
        ? contactList
              .filter(Boolean)
              .flatMap((item) => item.trim().split(/[,\s]+/))
              .filter(Boolean)
        : typeof contactList === "string"
        ? contactList
              .trim()
              .split(/[,\s]+/)
              .filter(Boolean)
        : [];

    if (!fullName || !department || !contactList || contacts.length === 0) {
        return <ContactCardSkeleton />;
    }

    return (
        <Card className="bg-[#FEF9F5] rounded-md w-full sm:w-80 md:w-[24rem] lg:w-[28rem] cursor-pointer">
            <CardHeader className="flex justify-between items-center px-4 py-2 bg-[#F7EDE2] rounded-t-md">
                <div className="flex items-center space-x-2">
                    <div className="text-xs font-semibold tracking-wide sm:text-sm md:text-base">
                        {isLoading
                            ? "Checking..."
                            : isFavorite
                            ? "Favorited"
                            : "Add to Favorite"}
                    </div>
                    <FavoriteToggle
                        id={id}
                        fullName={fullName}
                        department={department}
                        contactList={contacts}
                        designation={designation}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
                <div>
                    {/* <p className="text-xs font-medium sm:text-sm md:text-base">
                        Contact Numbers:
                    </p> */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {contacts.slice(0, 3).map((number, index) => (
                            <CopyNumber key={index} number={number} />
                        ))}
                    </div>
                </div>

                {/* Designation Section with Label Left, Value Right */}
                <div className="flex justify-between mt-2">
                    <span className="text-xs font-semibold text-gray-800 sm:text-sm md:text-base">
                        {designation}
                    </span>
                </div>

                <div className="flex justify-between mt-2">
                    <span className="text-xs font-semibold text-gray-800 sm:text-sm md:text-base">
                        {department}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
};

export default ContactCard;
