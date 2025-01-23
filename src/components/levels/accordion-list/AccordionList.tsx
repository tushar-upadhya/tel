import ContactDetails from "@/components/contact-card/ContactDetails";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define types for the children and their sub-levels
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
}

const AccordionList=({ childrens, selectedId, setSelectedId }:AccordionListProps) => {
  if (!Array.isArray(childrens) || childrens.length === 0) return null;

  return (
    <Accordion type="single" collapsible className="pl-4">
      {childrens.map((child) => (
        <AccordionItem key={child.id} value={`item-${child.id}`}>
          <AccordionTrigger
            className="m-1 mt-2 text-[min(4vw,1rem)] font-semibold transition-all duration-200 hover:underline-offset-auto"
            style={{ color: child.color || "inherit" }}
            onClick={() => setSelectedId(child.id)}
          >
            <span>{child.name}</span>
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="max-h-72 overflow-auto p-2 rounded-md no-scrollbar">
              {/* Render sub-levels */}
              <AccordionList childrens={child.childrens} selectedId={selectedId} setSelectedId={setSelectedId} />
            </ScrollArea>

            {/* Render Contact Details for the selected child */}
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
