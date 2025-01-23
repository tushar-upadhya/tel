import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

const LevelOnPcSkeleton: React.FC = () => {
  return (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-8 gap-2 p-4 bg-[#FEF9F5] rounded-md shadow-md">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </div>
  );
};

export default LevelOnPcSkeleton;
