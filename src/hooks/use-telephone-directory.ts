import {
    fetchContactDetails,
    fetchLevelData,
    fetchSearchContacts,
} from "@/service/api-service";
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
        enabled: !!id,
        staleTime: 10 * 60 * 1000, // Cache data for 10 minutes
        refetchOnWindowFocus: false,
        retry: 2,
    });
};

// Fetch Search Contacts Hook
export const useFetchGlobalSearchContacts = (query: string) => {
    return useQuery({
        queryKey: ["searchContacts", query],
        queryFn: () => fetchSearchContacts(query),
        enabled: !!query, // Fetch only if query is valid
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
        refetchOnWindowFocus: false,
        retry: 2,
    });
};
