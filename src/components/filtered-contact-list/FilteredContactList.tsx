import ContactAccordionItem from "../contact-card/ContactAccordionItem";

interface Contact {
    id: number;
    fullName?: string;
    department?: string;
    contactList?: string[];
    designation?: string;
    childrens?: Contact[];
}

interface FilteredContactListProps {
    contacts: Contact[];
    searchQuery: string;
}

const FilteredContactList: React.FC<FilteredContactListProps> = ({
    contacts,
    searchQuery,
}) => {
    // Convert search query to lowercase and trim it to avoid empty spaces issues
    const searchLower = searchQuery?.toLowerCase().trim() || "";

    // Recursive function to filter contacts and their children
    const filterContacts = (contact: Contact): boolean => {
        if (!searchLower) return true; // If no search query, return all contacts

        const isMatch =
            (contact.fullName?.toLowerCase() ?? "").includes(searchLower) ||
            (contact.department?.toLowerCase() ?? "").includes(searchLower) ||
            (contact.designation?.toLowerCase() ?? "").includes(searchLower) ||
            (contact.contactList?.some((contactItem) =>
                contactItem.toLowerCase().includes(searchLower)
            ) ??
                false);

        const filteredChildren =
            contact.childrens?.filter(filterContacts) || [];

        return isMatch || filteredChildren.length > 0;
    };

    // Filter contacts based on the recursive function
    const filteredContacts = contacts.filter(filterContacts);

    if (filteredContacts.length === 0) {
        return (
            <p className="text-center text-gray-500">
                No contacts match your search query.
            </p>
        );
    }

    return (
        <>
            {filteredContacts.map((contact) => (
                <ContactAccordionItem key={contact.id} contact={contact} />
            ))}
        </>
    );
};

export default FilteredContactList;
