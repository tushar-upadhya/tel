import ContactDetails from "@/components/contact-card/ContactDetails";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Child {
    id: number;
    name: string;
    color?: string;
    childrens?: Child[];
}

interface AccordionListProps {
    childrens?: Child[];
    selectedId: number | null;
    setSelectedId: (id: number) => void;
    searchQuery?: string; // Optional
}

const AccordionList = ({
    childrens = [], // ✅ Default to an empty array
    selectedId,
    setSelectedId,
    searchQuery = "",
}: AccordionListProps) => {
    if (!Array.isArray(childrens) || childrens.length === 0) return null;

    // ✅ Ensure `filteredChildrens` is never undefined
    const filteredChildrens = Array.isArray(childrens)
        ? childrens.filter((child) => {
              const name = child.name?.toLowerCase() || "";
              const query = searchQuery.toLowerCase();
              return name.includes(query);
          })
        : [];

    return (
        <Accordion type="single" collapsible className="pl-4">
            {filteredChildrens.map((child) => (
                <AccordionItem key={child.id} value={`item-${child.id}`}>
                    <AccordionTrigger
                        className="m-1 mt-2 text-[min(4vw,1rem)] font-semibold transition-all duration-200 hover:underline-offset-auto"
                        style={{ color: child.color || "inherit" }}
                        onClick={() => setSelectedId(child.id)}
                    >
                        <span>{child.name}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <ScrollArea className="p-2 overflow-auto rounded-md max-h-72 no-scrollbar">
                            <AccordionList
                                childrens={child.childrens ?? []} // ✅ Always pass an array
                                selectedId={selectedId}
                                setSelectedId={setSelectedId}
                                searchQuery={searchQuery}
                            />
                        </ScrollArea>
                        {selectedId === child.id && (
                            <ContactDetails selectedId={selectedId} />
                        )}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
};

export default AccordionList;
