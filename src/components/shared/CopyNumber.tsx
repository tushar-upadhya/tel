import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

interface CopyNumberProps {
    number: string;
}

const CopyNumber = ({ number }: CopyNumberProps) => {
    const { toast } = useToast();

    const handleDial = () => {
        const telLink = `tel:${number}`;
        try {
            window.location.href = telLink;
            toast({
                title: "Opening Dial Pad",
                description: `Calling ${number}...`,
                variant: "default",
            });
        } catch {
            toast({
                title: "Dial Failed",
                description: "Unable to open dial pad. Please try manually.",
                variant: "destructive",
            });
        }
    };

    return (
        <Button
            size="sm"
            variant="outline"
            onClick={handleDial}
            className="flex items-center px-1 py-0.5 text-xs sm:px-2 sm:py-1 sm:text-sm justify-start"
        >
            <span className="mr-1 truncate">{number}</span>
            <Copy size={12} className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
    );
};

export default CopyNumber;
