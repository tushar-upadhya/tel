import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { addToFavorites, removeFromFavorites } from "@/features/favoritesSlice";
import { useToast } from "@/hooks/use-toast";
import { RootState } from '@/store';
import { BookmarkPlus, Copy, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import ContactCardSkeleton from "../loading-skeleton/ContactCardSkeleton";

interface ContactCardProps {
  id: string;
  fullName: string;
  department: string;
  contactList: string[] | string;
  designation: string;
}

const ContactCard = ({ id, fullName, department, contactList, designation }: ContactCardProps) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setIsFavorite(favorites.some(favorite => favorite.id === id));
  }, [favorites, id]);

  const contacts = Array.isArray(contactList)
    ? contactList.filter(Boolean).flatMap(item => item.trim().split(/[,\s]+/)).filter(Boolean)
    : typeof contactList === 'string'
      ? contactList.trim().split(/[,\s]+/).filter(Boolean)
      : [];

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
    const contact = {
      id,
      fullName: fullName.trim(),
      department: department.trim(),
      contactList: contacts,
      designation: designation.trim()
    };

    if (isFavorite) {
      dispatch(removeFromFavorites(id));
      toast({
        title: "Removed from Favorites",
        description: `${fullName} has been removed from your favorites.`,
        variant: "destructive",
      });
    } else {
      dispatch(addToFavorites(contact));
      toast({
        title: "Added to Favorites",
        description: `${fullName} has been added to your favorites.`,
        variant: "default",
      });
    }
  };

  if (!fullName || !department || !contactList || contactList.length === 0) {
    return <ContactCardSkeleton />
  }

  return (
    <Card className="bg-[#FEF9F5] rounded-md w-full sm:w-96 cursor-pointer">
      <CardHeader className="flex justify-between items-center px-4 py-2 bg-[#F7EDE2] rounded-t-md">
        <div className="flex items-center space-x-2">
          <div className="text-[min(3.5vw,1rem)] font-semibold tracking-wide">Add To Favorite</div>
          <Button
            variant="ghost"
            onClick={toggleFavorite}
            className="text-red-600 hover:text-red-800 px-6 animate-bounce"
          >
            <BookmarkPlus fill={isFavorite ? "currentColor" : "none"} size={18} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <p className="text-[min(4vw,1rem)]">Contact Numbers:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {contacts.slice(0, 3).map((number, index) => (
                <Button key={index} size="sm" variant="outline" onClick={() => copyNumber(number)} className="flex items-center text-[min(4vw,1rem)]">
                  <span className="mr-1">{isCopied === number ? "Copied!" : number}</span>
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
          <p className="flex justify-between text-[min(4vw,1rem)]">
            Designation: <span>{designation}</span>
          </p>
          <p className="flex justify-between text-[min(4vw,1rem)]">
            Department: <span>{department}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
