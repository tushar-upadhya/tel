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
        <div className="block lg:hidden transition-all ease-in-out duration-500 opacity-100 transform lg:opacity-0 lg:-translate-x-10">
            <AccordionItem value={`contact-${contact.id}`}>
                <AccordionTrigger className="transition-all ease-in-out duration-300">
                    <Phone
                        size={15}
                        className="text-[#5C8374] animate-pulse"
                        fill="currentColor"
                    />
                    {contact.fullName || "Unnamed Contact"}
                </AccordionTrigger>
                <AccordionContent>
                    <ScrollArea className="h-92 w-full overflow-auto rounded-md border border-gray-200 p-2 shadow-sm">
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
        <div className="hidden lg:block transition-all ease-in-out duration-500 opacity-0 transform -translate-x-10 lg:opacity-100 lg:translate-x-0">
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
