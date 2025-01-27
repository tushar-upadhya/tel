import { setSearchQuery } from "@/features/search/searchQuerySlice";
import { useDebounce } from "@/hooks/use-debounce";
import { useFetchContactDetails } from "@/hooks/use-telephone-directory";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import FilteredContactList from "../filtered-contact-list/FilteredContactList";
import SearchBar from "../header/search-bar/SearchBar";
import { Accordion } from "../ui/accordion";
import { Skeleton } from "../ui/skeleton";

interface ContactDetailsProps {
    selectedId: number | null;
}

const ContactDetails = ({ selectedId }: ContactDetailsProps) => {
    const {
        data: contactDetails,
        isLoading,
        isError,
        error,
    } = useFetchContactDetails(selectedId);

    const searchQuery = useSelector(
        (state: RootState) => state.searchQuery.query
    );
    const dispatch = useDispatch();

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    if (isLoading) return <Skeleton className="h-96 w-full" />;
    if (isError) return <p>Error: {(error as Error).message}</p>;
    if (!contactDetails || contactDetails.length === 0)
        return <p>No contacts available</p>;

    return (
        <>
            {/* Search Bar */}
            <div className="mb-3 sm:mb-4 flex justify-center w-full pt-2">
                <SearchBar
                    query={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search contacts..."
                    className="text-sm sm:text-base justify-start w-full"
                />
            </div>

            {/* Filtered Contacts List */}
            <Accordion type="single" collapsible className="mt-2 sm:mt-4">
                <FilteredContactList
                    contacts={contactDetails}
                    searchQuery={debouncedSearchQuery}
                />
            </Accordion>
        </>
    );
};

export default ContactDetails;
