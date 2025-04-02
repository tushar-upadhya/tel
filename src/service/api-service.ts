import { Contact, Directory } from "@/lib/types/type";

export const BASE_URL = "http://192.168.30.88:8080/telephone-directory/public";

interface NetworkInfo {
    downlink: number;
}

const getNetworkSpeed = (): number | null => {
    if ("connection" in navigator) {
        const connection = navigator.connection as
            | Partial<NetworkInfo>
            | undefined;
        return connection?.downlink ?? null;
    }
    return null;
};

const fetchData = async <T>(url: string): Promise<T> => {
    try {
        const networkSpeed = getNetworkSpeed();
        const timeout =
            networkSpeed !== null && networkSpeed < 1 ? 25000 : 10000; // ⏳ Adjust timeout for slow networks

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        return (await response.json()) as T;
    } catch (error) {
        if (error instanceof Error) {
            throw error;
        }
        throw new Error("Network error occurred");
    }
};

export const fetchLevelData = (levelId: number): Promise<Directory> =>
    fetchData<Directory>(`${BASE_URL}/get-levels/${levelId}`);

export const fetchContactDetails = (id: number): Promise<Contact> => {
    if (id <= 0) throw new Error("Invalid Contact ID");
    return fetchData<Contact>(`${BASE_URL}/get-contact-details/${id}`);
};

export const fetchSearchContacts = (query: string): Promise<Directory[]> => {
    if (query.trim().length === 0) throw new Error("Search query required");
    return fetchData<Directory[]>(
        `${BASE_URL}/search-contacts?query=${encodeURIComponent(query)}`
    );
};
