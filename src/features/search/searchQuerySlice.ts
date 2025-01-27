import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchQueryState {
    query: string;
    level: number;
    subLevel: number;
}

const initialSearchQueryState: SearchQueryState = {
    query: "",
    level: 0,
    subLevel: 0,
};

const searchQuerySlice = createSlice({
    name: "searchQuery",
    initialState: initialSearchQueryState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        setSearchLevel: (state, action: PayloadAction<number>) => {
            state.level = action.payload;
        },
        setSearchSubLevel: (state, action: PayloadAction<number>) => {
            state.subLevel = action.payload;
        },
        resetSearch: (state) => {
            state.query = "";
            state.level = 0;
            state.subLevel = 0;
        },
    },
});

export const {
    setSearchQuery,
    setSearchLevel,
    setSearchSubLevel,
    resetSearch,
} = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
