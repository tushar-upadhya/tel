import LevelOnPcSkeleton from "@/components/loading-skeleton/LevelOnPcSkeleton";
import CopyNumber from "@/components/shared/CopyNumber";
import FavoriteToggle from "@/components/shared/FavoriteToggle";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RootState } from "@/store";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

interface LevelOnePcProps {
  id: string;
  fullName: string;
  department: string;
  contactList: string[] | string;
  designation: string;
}

const LevelOnePc = ({ id, fullName, department, contactList, designation }: LevelOnePcProps) => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [, setIsFavorite] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some(favorite => favorite.id === id));
  }, [favorites, id]);

  const contacts = Array.isArray(contactList)
    ? contactList.flatMap((item) => item.split(/[,\s]+/)).filter(Boolean)
    : String(contactList).split(/[,\s]+/).filter(Boolean);


  if (!fullName || !department || !contactList || contactList.length === 0) {
    return <LevelOnPcSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-3 bg-[#FEF9F5] items-center p-4">
      <div className="flex items-center justify-start">
       <FavoriteToggle
          id={id}
          fullName={fullName}
          department={department}
          contactList={contacts}
          designation={designation}
        />
      </div>
      <div className="col-span-2 flex items-center justify-center lg:justify-start">
        <span className="font-semibold text-xl sm:text-lg lg:text-sm">{fullName}</span>
      </div>
      <div className="col-span-2 flex items-center justify-center lg:justify-start space-x-1">
        {contacts.slice(0, 1).map((number, index) => (
           <CopyNumber key={index} number={number} />
        ))}
      </div>
      <div className="col-span-1 flex items-center justify-center lg:justify-start">
        <p className="font-medium text-sm sm:text-base lg:text-sm">{designation}</p>
      </div>
      <div className="col-span-1 flex items-center justify-center lg:justify-start">
        <p className="text-xs text-gray-500 sm:text-sm lg:text-sm">{department}</p>
      </div>
      <div className="col-span-1 justify-center lg:justify-start block lg:block">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-1 text-sm sm:text-base lg:text-sm"
            >
              <Ellipsis className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 animate-pulse" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl lg:text-lg font-semibold">
                {fullName}
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
              {/* Contact Numbers */}
              <div>
                <p className="font-medium text-sm sm:text-base">Contact Numbers:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {contacts.slice(1).map((number, index) => (
                    <CopyNumber key={index} number={number} />
                  ))}
                </div>
              </div>

              {/* Designation */}
              <div>
                <p className="font-medium text-sm sm:text-base">Designation:</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{designation}</p>
              </div>

              {/* Department */}
              <div>
                <p className="font-medium text-sm sm:text-base">Department:</p>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">{department}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default LevelOnePc;
