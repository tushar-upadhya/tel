import ContactAccordionItem from "../contact-card/ContactAccordionItem";


interface Contact {
  id: number;
  fullName?: string;
  department?: string;
  contactList?: string;
  designation?: string;
}

interface FilteredContactListProps {
  contacts: Contact[];
  searchQuery: string;
}

const FilteredContactList: React.FC<FilteredContactListProps> = ({ contacts, searchQuery }) => {
  const filteredContacts = contacts.filter((contact) =>
    (contact.fullName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.department || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.designation || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (contact.contactList || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredContacts.length === 0) {
    return <p className="text-center text-gray-500">No contacts match your search query.</p>;
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
