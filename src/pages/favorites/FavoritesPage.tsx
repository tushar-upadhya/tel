import SearchBar from "@/components/header/search-bar/SearchBar";
import CopyNumber from "@/components/shared/CopyNumber";
import FavoriteToggle from "@/components/shared/FavoriteToggle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { setFavoriteSearchQuery } from "@/features/search/favoriteSearchQuerySlice";
import { RootState } from "@/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const FavoritesPage: React.FC = () => {
    const favorites = useSelector(
        (state: RootState) => state.favorites.favorites
    );
    const searchQuery = useSelector(
        (state: RootState) => state.favoritesSearchQuery.query
    );
    const dispatch = useDispatch();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setFavoriteSearchQuery(e.target.value));
    };

    const filteredFavorites = favorites.filter((contact) => {
        const searchTerm = searchQuery.toLowerCase();
        return (
            contact.fullName.toLowerCase().includes(searchTerm) ||
            contact.department.toLowerCase().includes(searchTerm) ||
            contact.designation.toLowerCase().includes(searchTerm) ||
            contact.contactList.some((number) =>
                number.toLowerCase().includes(searchTerm)
            )
        );
    });

    return (
        <div className="p-6">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                <h1 className="text-2xl font-semibold text-gray-800">
                    Favorites
                </h1>
                <SearchBar
                    query={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Who's your go-to person today?"
                    className="w-full"
                />
            </div>

            <div className="grid grid-cols-1 gap-6 mt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredFavorites.length > 0 ? (
                    filteredFavorites.map((contact, index) => (
                        <Card
                            key={index}
                            className="bg-[#FEF9F5] w-full cursor-pointer"
                        >
                            <CardHeader className="flex justify-between items-center p-4 bg-[#F7EDE2] rounded-t-lg">
                                <div className="flex items-center justify-between w-full gap-4">
                                    <p className="text-[min(3.5vw,1rem)] font-semibold tracking-wide">
                                        {contact.fullName}
                                    </p>
                                    <FavoriteToggle {...contact} />
                                </div>
                            </CardHeader>
                            <CardContent className="p-4">
                                <div className="space-y-4">
                                    <div>
                                        <p className="font-medium text-gray-800">
                                            Contact Numbers:
                                        </p>
                                        <div className="flex flex-wrap gap-3 mt-2">
                                            {Array.isArray(
                                                contact.contactList
                                            ) &&
                                                contact.contactList
                                                    .slice(0, 3)
                                                    .map((number, index) => (
                                                        <CopyNumber
                                                            key={index}
                                                            number={number}
                                                        />
                                                    ))}
                                        </div>
                                    </div>
                                    <p className="flex text-[min(4vw,1rem)] justify-between text-gray-700">
                                        <span className="font-medium">
                                            Designation:
                                        </span>
                                        <span>{contact.designation}</span>
                                    </p>
                                    <p className="flex justify-between text-gray-700 text-[min(4vw,1rem)]">
                                        <span className="font-medium">
                                            Department:
                                        </span>
                                        <span>{contact.department}</span>
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500 capitalize">
                        {favorites.length === 0
                            ? "No favorites added"
                            : "No matches found"}
                    </p>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
