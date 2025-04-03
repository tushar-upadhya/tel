import LevelOnPcSkeleton from "@/components/loading-skeleton/LevelOnPcSkeleton";
import CopyNumber from "@/components/shared/CopyNumber";
import FavoriteToggle from "@/components/shared/FavoriteToggle";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

interface LevelOnePcProps {
    id: string;
    fullName: string;
    department: string;
    contactList: string[] | string;
    designation: string;
}

const LevelOnePc = ({
    id,
    fullName,
    department,
    contactList,
    designation,
}: LevelOnePcProps) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const contacts = Array.isArray(contactList)
        ? contactList.flatMap((item) => item.split(/[,\s]+/)).filter(Boolean)
        : String(contactList)
              .split(/[,\s]+/)
              .filter(Boolean);

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
            <div className="flex items-center justify-center col-span-2 lg:justify-start">
                <span className="text-xl font-semibold sm:text-lg lg:text-sm">
                    {fullName}
                </span>
            </div>
            <div className="flex items-center justify-center col-span-2 space-x-1 lg:justify-start">
                {contacts.slice(0, 1).map((number, index) => (
                    <CopyNumber key={index} number={number} />
                ))}
            </div>
            <div className="flex items-center justify-center col-span-1 lg:justify-start">
                <p className="text-sm font-medium sm:text-base lg:text-sm">
                    {designation}
                </p>
            </div>
            <div className="flex items-center justify-center col-span-1 lg:justify-start">
                <p className="text-xs text-gray-500 sm:text-sm lg:text-sm">
                    {department}
                </p>
            </div>
            <div className="justify-center block col-span-1 lg:justify-start lg:block">
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
                            <DialogTitle className="text-lg font-semibold sm:text-xl lg:text-lg">
                                {fullName}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 gap-4 py-4 sm:grid-cols-2">
                            {/* Contact Numbers */}
                            <div>
                                <p className="text-sm font-medium sm:text-base">
                                    Contact Numbers:
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {contacts.map((number, index) => (
                                        <CopyNumber
                                            key={index}
                                            number={number}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Designation */}
                            <div>
                                <p className="text-sm font-medium sm:text-base">
                                    Designation:
                                </p>
                                <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                                    {designation}
                                </p>
                            </div>

                            {/* Department */}
                            <div>
                                <p className="text-sm font-medium sm:text-base">
                                    Department:
                                </p>
                                <p className="mt-1 text-xs text-gray-600 sm:text-sm">
                                    {department}
                                </p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default LevelOnePc;
