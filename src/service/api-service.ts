import { Contact, Directory } from "@/lib/types/type";

export const BASE_URL = "http://192.168.30.88:8080/telephone-directory/public";

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
                "Cache-Control": "no-cache",
                Connection: "keep-alive",
                "Accept-Encoding": "gzip, deflate, br",
            },
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const status = response.status;
            throw new Error(
                `HTTP error ${status}: ${
                    response.statusText || "Unknown error"
                }`
            );
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
                throw new Error("Request timed out");
            }
            throw error;
        }
        throw new Error("Network error occurred");
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
