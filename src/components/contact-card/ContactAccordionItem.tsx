import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import ContactCard from "./ContactCard";

interface Contact {
  id: number;
  fullName?: string;
  department?: string;
  contactList?: string[];
  designation?: string;
}

interface ContactAccordionItemProps {
  contact: Contact;
}

const ContactAccordionItem: React.FC<ContactAccordionItemProps> = ({ contact }) => (
  <AccordionItem value={`contact-${contact.id}`}>
    <AccordionTrigger className="transition-all ease-in-out duration-300">
      {contact.fullName || "Unnamed Contact"}
    </AccordionTrigger>
    <AccordionContent>
      <ScrollArea className="h-92 w-full overflow-auto rounded-md border border-gray-200 p-2 shadow-sm">
        <ContactCard
          fullName={contact.fullName || "Unnamed Contact"}
          department={contact.department || "Unknown Department"}
          contactList={contact.contactList || []}
          designation={contact.designation || "No Designation"}
        />
      </ScrollArea>
    </AccordionContent>
  </AccordionItem>
);

export default ContactAccordionItem;
