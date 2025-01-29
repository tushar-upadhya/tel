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
    // Recursive function to filter the contact and its children
    const filterContacts = (contact: Contact): boolean => {
        const searchLower = searchQuery;

        const isMatch =
            (contact.fullName ?? "").toLowerCase().includes(searchLower) ||
            (contact.department ?? "").toLowerCase().includes(searchLower) ||
            (contact.designation ?? "").toLowerCase().includes(searchLower) ||
            (Array.isArray(contact.contactList)
                ? contact.contactList.some((contactItem) =>
                      (contactItem ?? "").toLowerCase().includes(searchLower)
                  )
                : false);

        // Ensure filteredChildren is an array before checking length
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
