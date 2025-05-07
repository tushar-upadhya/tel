/* eslint-disable @typescript-eslint/no-explicit-any */
import { SearchItem } from "@/components/header/Header";
import { Contact, Directory } from "@/lib/types/type";

// export const BASE_URL = "http://192.168.30.88:8080/telephone-directory/public";
export const BASE_URL = "http://192.168.14.12:8080/telephone-directory/public";

const TIMEOUTS = {
    SLOW: 15000,
    MEDIUM: 10000,
    FAST: 8000,
    FALLBACK: 10000,
};

const NETWORK_SPEED_TIERS = {
    SLOW: 1,
    MEDIUM: 5,
};

interface NetworkInfo {
    downlink: number;
}

const getNetworkSpeed = (): number | null => {
    if ("connection" in navigator && navigator.connection) {
        const connection = navigator.connection as Partial<NetworkInfo>;
        return connection.downlink ?? null;
    }
    return null;
};

const isOnline = (): boolean => {
    return navigator.onLine !== false;
};

export const fetchData = async <T>(url: string): Promise<T> => {
    if (!isOnline()) {
        throw new Error(
            "Device is offline. Please check your internet connection."
        );
    }

    const networkSpeed = getNetworkSpeed();
    let timeout: number;

    if (networkSpeed === null) {
        timeout = TIMEOUTS.FALLBACK;
    } else if (networkSpeed < NETWORK_SPEED_TIERS.SLOW) {
        timeout = TIMEOUTS.SLOW;
    } else if (networkSpeed < NETWORK_SPEED_TIERS.MEDIUM) {
        timeout = TIMEOUTS.MEDIUM;
    } else {
        timeout = TIMEOUTS.FAST;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "max-age=300, public",
                Connection: "keep-alive",
                "Accept-Encoding": "gzip, deflate, br",
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const status = response.status;
            let message = `HTTP error ${status}`;
            if (status === 404) message = "Resource not found";
            else if (status === 500) message = "Server error occurred";
            else message = response.statusText || "Unknown error";
            throw new Error(message);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
            throw new Error("Invalid response: Expected JSON");
        }

        return (await response.json()) as T;
    } catch (error) {
        clearTimeout(timeoutId);

        if (error instanceof Error) {
            if (error.name === "AbortError") {
                throw new Error("Request timed out. Please try again.");
            }
            throw error;
        }
        throw new Error(
            "Network error occurred. Please check your connection."
        );
    }
};

export const fetchLevelData = (levelId: number): Promise<Directory> => {
    if (!Number.isInteger(levelId) || levelId <= 0) {
        throw new Error("Invalid Level ID: Must be a positive integer");
    }
    return fetchData<Directory>(`${BASE_URL}/get-levels/${levelId}`);
};

export const fetchContactDetails = (id: number): Promise<Contact> => {
    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid Contact ID: Must be a positive integer");
    }
    return fetchData<Contact>(`${BASE_URL}/get-contact-details/${id}`);
};

export const fetchGlobalSearchContacts = async (
    fullNameQuery: string,
    designationQuery: string,
    departmentQuery: string
): Promise<SearchItem[]> => {
    const params = new URLSearchParams();
    if (fullNameQuery.trim()) params.append("fname", fullNameQuery.trim());
    if (designationQuery.trim()) params.append("desg", designationQuery.trim());
    if (departmentQuery.trim()) params.append("dept", departmentQuery.trim());

    if (!params.toString()) {
        return [];
    }

    const url = `${BASE_URL}/search-contacts?${params.toString()}`;
    const response = await fetchData<any[]>(url);

    return response.map((item) => ({
        id: item.id?.toString() ?? "",
        fullName: item.fullName || "Unknown",
        designation: item.designation || "Unknown",
        department: item.department || "Unknown",
        contactList: item.contactList || null,
    }));
};
