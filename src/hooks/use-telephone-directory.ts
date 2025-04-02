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
        staleTime: 2 * 60 * 1000, // ⏳ Reduce stale time
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true, // ✅ Get fresh data when user returns
        retry: 1, // 🔄 Fewer retries to save time on slow networks
    });

export const useFetchContactDetails = (id: number | null) =>
    useQuery<Contact, Error>({
        queryKey: ["contactDetails", id],
        queryFn: () => fetchContactDetails(id!),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        refetchOnWindowFocus: true, // ✅ Auto-refresh on focus
        retry: 1,
        placeholderData: undefined,
    });

export const useFetchGlobalSearchContacts = (query: string) => {
    const debouncedQuery = useDebounce(query, 200); // ✅ Faster debounce
    return useQuery<Directory[], Error>({
        queryKey: ["searchContacts", debouncedQuery],
        queryFn: () => fetchSearchContacts(debouncedQuery),
        enabled: !!debouncedQuery && debouncedQuery.length >= 3,
        staleTime: 2 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry: 1,
    });
};
