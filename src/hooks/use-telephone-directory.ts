import { Contact, Directory } from "@/lib/types/type";
import { fetchContactDetails, fetchLevelData } from "@/service/api-service";
import { useQuery } from "@tanstack/react-query";

export const useFetchLevelData = (levelId: number) =>
    useQuery<Directory, Error>({
        queryKey: ["levelData", levelId],
        queryFn: () => fetchLevelData(levelId),
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry: 1,
    });

export const useFetchContactDetails = (id: number | null) =>
    useQuery<Contact, Error>({
        queryKey: ["contactDetails", id],
        queryFn: () => fetchContactDetails(id!),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry: 1,
        placeholderData: undefined,
    });
