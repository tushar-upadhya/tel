const BASE_URL = "http://192.168.30.88:8080/telephone-directory/public";

// Fetch level data
export const fetchLevelData = async (levelId: number) => {
  const response = await fetch(`${BASE_URL}/get-levels/${levelId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching levels for ID ${levelId}: ${response.statusText}`);
  }
  return response.json();
};

// Fetch contact details
export const fetchContactDetails = async (id: number) => {
  const response = await fetch(`${BASE_URL}/get-contact-details/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Error fetching contact details for ID ${id}: ${response.statusText}`);
  }
  return response.json();
};
