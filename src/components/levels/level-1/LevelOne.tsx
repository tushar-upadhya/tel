import AccordionList from "@/components/levels/accordion-list/AccordionList";
import { Skeleton } from "@/components/ui/skeleton";
import { setSelectedId } from "@/features/selectedLevelSlice";
import { useFetchLevelData } from "@/hooks/use-telephone-directory";
import { RootState } from "@/store";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const LevelOne: React.FC  = () => {
  const [currentLevel] = useState<number>(1);

  const { data: levelData, isLoading, isError, error } = useFetchLevelData(currentLevel);

  const selectedId = useSelector((state: RootState) => state.selectedLevel.selectedId)
  const dispatch = useDispatch();

  const handleSetSelectedId = (id: number) => {
    dispatch(setSelectedId(id));
  };

  if (isLoading) return <Skeleton className="h-96 w-full" />;
  if (isError) return <p className="text-red-500">Error: {(error as Error).message}</p>;

  return (
    <div className="w-full">
      <div className="container sm:p-4 bg-[#FEF9F5] rounded-md">
        <AccordionList
          childrens={levelData?.childrens}
          selectedId={selectedId}
          setSelectedId={handleSetSelectedId}
        />
      </div>
    </div>
  );
};

export default LevelOne;
