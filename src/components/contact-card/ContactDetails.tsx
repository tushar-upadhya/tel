import { useDebounce } from "@/hooks/use-debounce";
import { useFetchContactDetails } from "@/hooks/use-telephone-directory";
import { useState } from "react";
import FilteredContactList from "../filtered-contact-list/FilteredContactList";
import SearchBar from "../header/search-bar/SearchBar";
import { Accordion } from "../ui/accordion";
import { Skeleton } from "../ui/skeleton";

interface ContactDetailsProps {
    selectedId: number | null;
}

interface Contact {
    id: number;
    fullName?: string;
    department?: string;
    designation?: string;
    contactNumber?: string;
    childrens?: Contact[];
}

const ContactDetails = ({ selectedId }: ContactDetailsProps) => {
    const {
        data: contactDetails,
        isLoading,
        isError,
        error,
    } = useFetchContactDetails(selectedId);

    const [searchQuery, setSearchQuery] = useState<string>("");
    const debouncedSearchQuery = useDebounce(searchQuery, 300);

    const filterContacts = (contacts: Contact[], query: string): Contact[] => {
        if (!query) return contacts;

        const lowerQuery = query.toLowerCase();

        return contacts.filter((contact) =>
            [
                contact.fullName,
                contact.department,
                contact.designation,
                contact.contactNumber,
            ].some((field) => field?.toLowerCase().includes(lowerQuery))
        );
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
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search contacts..."
                    className="text-sm sm:text-base justify-start w-full"
                />
            </div>

            {/* Filtered Contacts List */}
            <Accordion type="single" collapsible className="mt-2 sm:mt-4">
                <FilteredContactList
                    contacts={filterContacts(
                        contactDetails,
                        debouncedSearchQuery
                    )}
                    searchQuery={debouncedSearchQuery}
                />
            </Accordion>
        </>
    );
};

export default ContactDetails;
