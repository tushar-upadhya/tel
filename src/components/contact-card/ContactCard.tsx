import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RootState } from '@/store';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import ContactCardSkeleton from "../loading-skeleton/ContactCardSkeleton";
import CopyNumber from "../shared/CopyNumber";
import FavoriteToggle from "../shared/FavoriteToggle";

interface ContactCardProps {
  id: string;
  fullName: string;
  department: string;
  contactList: string[] | string;
  designation: string;
}

const ContactCard = ({ id, fullName, department, contactList, designation }: ContactCardProps) => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [, setIsFavorite] = useState(false);


  useEffect(() => {
    setIsFavorite(favorites.some(favorite => favorite.id === id));
  }, [favorites, id]);

  const contacts = Array.isArray(contactList)
    ? contactList.filter(Boolean).flatMap(item => item.trim().split(/[,\s]+/)).filter(Boolean)
    : typeof contactList === 'string'
      ? contactList.trim().split(/[,\s]+/).filter(Boolean)
      : [];

  if (!fullName || !department || !contactList || contactList.length === 0) {
    return <ContactCardSkeleton />
  }

  return (
    <Card className="bg-[#FEF9F5] rounded-md w-full sm:w-96 cursor-pointer">
      <CardHeader className="flex justify-between items-center px-4 py-2 bg-[#F7EDE2] rounded-t-md">
        <div className="flex items-center space-x-2">
          <div className="text-[min(3.5vw,1rem)] font-semibold tracking-wide">Add To Favorite</div>
  <FavoriteToggle
          id={id}
          fullName={fullName}
          department={department}
          contactList={contacts}
          designation={designation}
        />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <div>
            <p className="text-[min(4vw,1rem)]">Contact Numbers:</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {contacts.slice(0, 3).map((number, index) => (
                 <CopyNumber key={index} number={number} />
              ))}
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
