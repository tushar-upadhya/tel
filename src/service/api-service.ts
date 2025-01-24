export const BASE_URL = "http://192.168.30.88:8080/telephone-directory/public";

// Reusable fetch function to handle GET requests
const fetchData = async (url: string) => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle non-OK responses
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    // Type guard for error
    if (error instanceof Error) {
      // Now we can safely access error.message
      throw new Error(`Network or API error: ${error.message}`);
    } else {
      throw new Error('An unknown error occurred.');
    }
  }
};

// Fetch level data
export const fetchLevelData = async (levelId: number) => {
  return fetchData(`${BASE_URL}/get-levels/${levelId}`);
};

// Fetch contact details
export const fetchContactDetails = async (id: number) => {
  if (!id) {
    throw new Error("Contact ID is required");
  }
  return fetchData(`${BASE_URL}/get-contact-details/${id}`);
};
