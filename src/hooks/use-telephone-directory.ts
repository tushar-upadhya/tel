import { fetchContactDetails, fetchLevelData } from "@/service/api-service";
import { useQuery } from "@tanstack/react-query";

// Fetch Level Data Hook
export const useFetchLevelData = (levelId: number) => {
    return useQuery({
        queryKey: ["levelData", levelId],
        queryFn: () => fetchLevelData(levelId),
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        refetchOnWindowFocus: false,
        retry: 2,
    });
};

// Fetch Contact Details Hook
export const useFetchContactDetails = (id: number | null) => {
    return useQuery({
        queryKey: ["contactDetails", id],
        queryFn: () => fetchContactDetails(id!),
        enabled: !!id, // Fetch only if ID is valid
        staleTime: 10 * 60 * 1000, // Cache data for 10 minutes
        refetchOnWindowFocus: false,
        retry: 2,
    });
};
