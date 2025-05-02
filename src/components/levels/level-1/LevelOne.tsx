import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { setSelectedId } from "@/features/selectedLevelSlice";
import { useFetchLevelData } from "@/hooks/use-telephone-directory";
import { Child, Directory } from "@/lib/types/type";
import { RootState } from "@/store";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccordionList from "../accordion-list/AccordionList";

const convertToChild = (directories: Directory[]): Child[] => {
    return directories.map((directory) => ({
        id: directory.id,
        name: directory.name,
        color: directory.color ?? undefined,
        childrens: directory.childrens
            ? convertToChild(directory.childrens)
            : [],
    }));
};

const LevelOne: React.FC = () => {
    const [currentLevel] = useState<number>(1);

    const {
        data: levelData,
        isLoading,
        isError,
        error,
        refetch,
    } = useFetchLevelData(currentLevel);

    const selectedId = useSelector(
        (state: RootState) => state.selectedLevel.selectedId
    );
    const dispatch = useDispatch();

    const handleSetSelectedId = useCallback(
        (id: number) => {
            dispatch(setSelectedId(id));
        },
        [dispatch]
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center w-full">
                <Skeleton className="w-full h-96" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 text-center">
                <p className="p-2 mt-3 text-xs font-semibold text-center text-red-500 bg-red-100 rounded-sm sm:p-3 md:p-4 sm:text-sm md:text-base">
                    {(error as Error).message}
                </p>
                <Button
                    variant="outline"
                    onClick={() => refetch()}
                    className="mt-2"
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="container sm:p-4 bg-[#FEF9F5] rounded-md">
                <AccordionList
                    childrens={convertToChild(levelData?.childrens ?? [])}
                    selectedId={selectedId}
                    setSelectedId={handleSetSelectedId}
                />
            </div>
        </div>
    );
};

export default LevelOne;
