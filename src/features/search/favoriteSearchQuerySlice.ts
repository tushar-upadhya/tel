import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FavoriteSearchQueryState {
    query: string;
}

const initialFavoriteSearchQueryState: FavoriteSearchQueryState = {
    query: "",
};

const favoriteSearchQuerySlice = createSlice({
    name: "favoriteSearchQuery",
    initialState: initialFavoriteSearchQueryState,
    reducers: {
        setFavoriteSearchQuery(state, action: PayloadAction<string>) {
            state.query = action.payload;
        },
    },
});

export const { setFavoriteSearchQuery } = favoriteSearchQuerySlice.actions;
export default favoriteSearchQuerySlice.reducer;
