import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

interface CopyNumberProps {
    number: string;
}

const CopyNumber = ({ number }: CopyNumberProps) => {
    const { toast } = useToast();

    const handleDial = () => {
        // Create a tel: link to trigger the dial pad
        const telLink = `tel:${number}`;

        try {
            // Attempt to open the dial pad
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
            className="flex items-center px-2 py-1 text-sm sm:text-base lg:text-sm"
        >
            <span className="mr-1 text-xs sm:text-sm lg:text-sm">{number}</span>
            <Copy size={16} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
        </Button>
    );
};

export default CopyNumber;
