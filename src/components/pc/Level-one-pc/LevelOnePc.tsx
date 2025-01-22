import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Copy, ExternalLink, Heart } from "lucide-react";
import { useState } from "react";

interface LevelOnePcProps {
  fullName: string;
  department: string;
  contactList: string[];
  designation: string;
}

const LevelOnePc = ({
  fullName,
  department,
  contactList,
  designation,
}: LevelOnePcProps) => {
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const contacts = Array.isArray(contactList)
    ? contactList.flatMap(item => item.split(/[,\s]+/)).filter(Boolean)
    : String(contactList).split(/[,\s]+/).filter(Boolean);

  const copyNumber = (number: string) => {
    if (!navigator.clipboard) {
      toast({
        title: "Copy Failed",
        description: "Clipboard access is not supported in your browser.",
        variant: "destructive",
      });
      return;
    }

    navigator.clipboard.writeText(number).then(() => {
      setIsCopied(number);

      setTimeout(() => setIsCopied(null), 1500);
      toast({
        title: "Number Copied",
        description: `Contact number ${number} has been copied to clipboard.`,
        variant: "default",
      });
    });
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: `${fullName} has been ${isFavorite ? "removed from" : "added to"} your favorites.`,
      variant: "default",
    });
  };

  if (!fullName || !department || !contactList || contactList.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 p-4 bg-[#FEF9F5] rounded-md shadow-md">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-3 space-y-3 lg:space-y-0 bg-[#FEF9F5] items-center p-4 lg:p-4">
      {/* Favorites Button */}
      <div className="flex items-center justify-start lg:justify-start">
        <Button
                  variant="ghost"
                  size={'icon'}
          onClick={toggleFavorite}
          className="text-red-600 hover:text-red-800 px-3 rounded-full"
        >
          <Heart fill={isFavorite ? "currentColor" : "none"} size={20} className="w-5 h-5 lg:w-6 lg:h-6" />
        </Button>
      </div>

      {/* Full Name */}
      <div className="col-span-2 flex items-center justify-center lg:justify-start">
        <span className="font-semibold text-xl sm:text-lg lg:text-sm">{fullName}</span>
      </div>

      {/* Contact Numbers */}
      <div className="col-span-2 flex items-center justify-center lg:justify-start space-x-1">
        {contacts.slice(0, 1).map((number, index) => (
          <Button
            key={index}
            size="sm"
            variant="outline"
            onClick={() => copyNumber(number)}
            className="flex items-center px-2 py-1 text-sm sm:text-base lg:text-sm"
          >
            <span className="mr-1 text-xs sm:text-sm lg:text-sm">
              {isCopied === number ? "Copied!" : number}
            </span>
            <Copy size={16} className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
          </Button>
        ))}
      </div>

      {/* Designation */}
      <div className="col-span-1 flex items-center justify-center lg:justify-start">
        <p className="font-medium text-sm sm:text-base lg:text-sm">{designation}</p>
      </div>

      {/* Department */}
      <div className="col-span-1 flex items-center justify-center lg:justify-start">
        <p className="text-xs text-gray-500 sm:text-sm lg:text-sm">{department}</p>
      </div>

      {/* Dialog */}
      <div className="col-span-1 flex justify-center lg:justify-start">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-1 text-sm sm:text-base lg:text-sm"
            >
              <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{fullName}</DialogTitle>
            </DialogHeader>
            <div className="py-3 space-y-2">
              <p><strong>Name:</strong> {fullName}</p>
              <p><strong>Contact Numbers:</strong> {contactList}</p>
              <p><strong>Designation:</strong> {designation}</p>
              <p><strong>Department:</strong> {department}</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LevelOnePc;
