import { Contact, Directory } from "@/lib/types/type";
import {
    fetchContactDetails,
    fetchLevelData,
    fetchSearchContacts,
} from "@/service/api-service";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./use-debounce";

export const useFetchLevelData = (levelId: number) =>
    useQuery<Directory, Error>({
        queryKey: ["levelData", levelId],
        queryFn: () => fetchLevelData(levelId),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2,
    });

export const useFetchContactDetails = (id: number | null) =>
    useQuery<Contact, Error>({
        queryKey: ["contactDetails", id],
        queryFn: () => fetchContactDetails(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
        gcTime: 15 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2,
        placeholderData: undefined,
    });

export const useFetchGlobalSearchContacts = (query: string) => {
    const debouncedQuery = useDebounce(query, 300);
    return useQuery<Directory[], Error>({
        queryKey: ["searchContacts", debouncedQuery],
        queryFn: () => fetchSearchContacts(debouncedQuery),
        enabled: !!debouncedQuery && debouncedQuery.length >= 3,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: 2,
    });
};
