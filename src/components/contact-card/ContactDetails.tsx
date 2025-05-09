import { useDebounce } from "@/hooks/use-debounce";
import { useFetchContactDetails } from "@/hooks/use-telephone-directory";
import { useState } from "react";
import FilteredContactList from "../filtered-contact-list/FilteredContactList";
import SearchBar from "../header/search-bar/SearchBar";
import { Accordion } from "../ui/accordion";
import { Skeleton } from "../ui/skeleton";

export interface Contact {
    id: number;
    fullName: string;
    department: string;
    designation: string;
    contactList: string[];
    childrens?: Contact[];
}

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

    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedSearchQuery = useDebounce(searchQuery, 150);

    if (isLoading) return <Skeleton className="w-full h-96" />;
    if (isError)
        return <p>Error: {(error as Error)?.message || "Unknown error"}</p>;

    const contactsArray = Array.isArray(contactDetails)
        ? contactDetails
        : contactDetails && typeof contactDetails === "object"
        ? [contactDetails]
        : [];

    if (contactsArray.length === 0)
        return (
            <p className="p-2 mt-3 text-xs font-semibold text-center text-red-500 bg-red-100 rounded-sm sm:p-3 md:p-4 sm:text-sm md:text-base">
                No contacts available
            </p>
        );

    return (
        <>
            <div className="flex justify-start w-full pt-2 mb-3 sm:mb-4">
                <SearchBar
                    query={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Your go-to contact is just a few letters away...."
                    className="w-full max-w-[300px] ml-5 sm:max-w-[81rem] text-sm sm:text-base"
                />
            </div>
            <Accordion type="single" collapsible className="mt-2 sm:mt-4">
                <FilteredContactList
                    contacts={contactsArray}
                    searchQuery={debouncedSearchQuery}
                />
            </Accordion>
        </>
    );
};

export default ContactDetails;
