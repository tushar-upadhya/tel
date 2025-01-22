import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Copy, Heart, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface ContactCardProps {
  fullName: string;
  department: string;
  contactList: string[];
  designation: string;
}

const ContactCard = ({
  fullName,
  department,
  contactList,
  designation,
}: ContactCardProps) => {
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { toast } = useToast();


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
      <Card className="bg-[#FEF9F5] rounded-md w-full sm:w-96 cursor-pointer">
        <CardHeader className="text-center text-slate-800">
          <Skeleton className="h-4 w-32 mx-auto mb-2" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
        <CardFooter>
          <Skeleton className="h-4 w-20 mx-auto" />
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="bg-[#FEF9F5] rounded-md w-full sm:w-96 cursor-pointer">
      <CardHeader className="flex justify-between items-center px-4 py-2 bg-[#F7EDE2] rounded-t-md">
        <div className="flex items-center space-x-2">
          <div className="text-[min(3vw,1rem)] font-semibold tracking-wide">
            Add To Favorite
          </div>
          <Button
            variant="ghost"
            onClick={toggleFavorite}
            className="text-red-600 hover:text-red-800 px-6 animate-bounce"
          >
            <Heart fill={isFavorite ? "currentColor" : "none"} size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <p className="font-medium">Contact Numbers:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {contacts.slice(0, 3).map((number, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="outline"
                  onClick={() => copyNumber(number)}
                  className="flex items-center"
                >
                  <span className="mr-1">
                    {isCopied === number ? "Copied!" : number}
                  </span>
                  <Copy size={16} />
                </Button>
              ))}
              {contacts.length > 3 && (
                <Button size="sm" variant="ghost" className="flex items-center">
                  <MoreHorizontal size={16} />
                  <span className="ml-1">+{contacts.length - 3} more</span>
                </Button>
              )}
            </div>
          </div>
          <p className="flex justify-between">
            Designation: <span>{designation}</span>
          </p>
          <p className="flex justify-between">
            Department: <span>{department}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
