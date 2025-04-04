import {
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone } from "lucide-react";
import LevelOnePc from "../pc/Level-one-pc/LevelOnePc";
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

const ContactAccordionItem: React.FC<ContactAccordionItemProps> = ({
    contact,
}) => (
    <div>
        {/* Mobile View */}
        <div className="block transition-all duration-500 ease-in-out transform opacity-100 lg:hidden lg:opacity-0 lg:-translate-x-10">
            <AccordionItem value={`contact-${contact.id}`}>
                <AccordionTrigger className="transition-all duration-300 ease-in-out">
                    <Phone
                        size={15}
                        className="text-[#5C8374] animate-pulse"
                        fill="currentColor"
                    />

                    {contact.fullName || "Unnamed Contact"}
                </AccordionTrigger>
                <AccordionContent>
                    <ScrollArea className="w-full p-2 overflow-auto border border-gray-200 rounded-md shadow-sm h-92">
                        <ContactCard
                            id={String(contact.id)}
                            fullName={contact.fullName || "Unnamed Contact"}
                            department={
                                contact.department || "Unknown Department"
                            }
                            contactList={contact.contactList || []}
                            designation={
                                contact.designation || "No Designation"
                            }
                        />
                    </ScrollArea>
                </AccordionContent>
            </AccordionItem>
        </div>

        {/* Desktop View */}
        <div className="hidden transition-all duration-500 ease-in-out transform -translate-x-10 opacity-0 lg:block lg:opacity-100 lg:translate-x-0">
            <LevelOnePc
                id={String(contact.id)}
                fullName={contact.fullName || "Unnamed Contact"}
                department={contact.department || "Unknown Department"}
                contactList={contact.contactList || []}
                designation={contact.designation || "No Designation"}
            />
        </div>
    </div>
);

export default ContactAccordionItem;
