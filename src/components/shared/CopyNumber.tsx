import { Button } from "@/components/ui/button";
import { setCopiedNumber } from "@/features/copiedSlice";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import { useDispatch } from "react-redux";
;

interface CopyNumberProps {
  number: string;
}

const CopyNumber = ({ number }: CopyNumberProps) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const handleCopy = () => {
    if (!navigator.clipboard) {
      toast({
        title: "Copy Failed",
        description: "Clipboard access is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    navigator.clipboard.writeText(number).then(() => {
      dispatch(setCopiedNumber(number));
      toast({
        title: "Number Copied",
        description: `Contact number ${number} has been copied to clipboard.`,
        variant: "default",
      });
    });
  };

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleCopy}
      className="flex items-center px-2 py-1 text-sm sm:text-base lg:text-sm"
    >
      <span className="mr-1 text-xs sm:text-sm lg:text-sm">{number}</span>
      <Copy size={16} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
    </Button>
  );
};

export default CopyNumber;
