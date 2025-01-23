import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import React from 'react';
import { Skeleton } from '../ui/skeleton';

const ContactCardSkeleton: React.FC = () => {
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
};

export default ContactCardSkeleton;
