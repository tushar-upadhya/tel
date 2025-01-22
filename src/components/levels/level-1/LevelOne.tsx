import AccordionList from "@/components/levels/accordion-list/AccordionList";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchLevelData } from "@/hooks/use-telephone-directory";
import { useState } from "react";

const LevelOne = () => {
  const [currentLevel] = useState<number>(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const { data: levelData, isLoading, isError, error } = useFetchLevelData(currentLevel);

  if (isLoading) return <Skeleton className="h-96 w-full" />;
  if (isError) return <p className="text-red-500">Error: {(error as Error).message}</p>;

  return (
    <div className="w-full">
      <div className="container sm:p-4 bg-[#FEF9F5] rounded-md">
        <AccordionList childrens={levelData?.childrens} selectedId={selectedId} setSelectedId={setSelectedId} />
      </div>
    </div>
  );
};

export default LevelOne;
