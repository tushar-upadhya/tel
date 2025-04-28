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
    const searchLower = searchQuery?.toLowerCase() || "";

    const filterContacts = (contact: Contact): boolean => {
        if (!searchLower) return true;

        const isMatch =
            (contact.fullName?.toLowerCase() ?? "").includes(searchLower) ||
            (contact.department?.toLowerCase() ?? "").includes(searchLower) ||
            (contact.designation?.toLowerCase() ?? "").includes(searchLower);

        const filteredChildren =
            contact.childrens?.filter(filterContacts) || [];

        return isMatch || filteredChildren.length > 0;
    };

    const filteredContacts = contacts.filter(filterContacts);

    if (filteredContacts.length === 0) {
        return (
            <p className="font-semibold text-center text-rose-400">
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
