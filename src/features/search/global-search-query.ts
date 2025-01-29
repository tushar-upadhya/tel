import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: "",
    filteredContacts: null,
};

// Recursive function to filter contacts while preserving hierarchy
const filterContacts = (contacts: any[], query: string) => {
    if (!contacts) return null;

    return contacts.reduce(
        (acc: any[], contact: { [x: string]: string; childrens: any }) => {
            let hasMatchingChild = false;
            let filteredChildren = [];

            // If there are sub-levels, filter them recursively
            if (contact.childrens) {
                filteredChildren = filterContacts(contact.childrens, query);
                hasMatchingChild = filteredChildren.length > 0;
            }

            // Check if the current contact matches the query
            const matchesQuery = [
                "fullName",
                "department",
                "designation",
                "contactNumber",
            ].some((key) =>
                contact[key]?.toLowerCase().includes(query.toLowerCase())
            );

            // If contact matches or has matching children, include it in the result
            if (matchesQuery || hasMatchingChild) {
                acc.push({ ...contact, childrens: filteredChildren });
            }
            return acc;
        },
        []
    );
};

// Slice
const searchSlice = createSlice({
    name: "globalSearchQuery",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.query = action.payload;
        },
        globalSearchQuery: (state, action) => {
            const { contacts } = action.payload;
            state.filteredContacts = filterContacts(contacts, state.query);
        },
    },
});

export const { setSearchQuery, globalSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
