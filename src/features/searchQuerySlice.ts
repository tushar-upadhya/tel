import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchQueryState {
  query: string;
}

const initialSearchQueryState: SearchQueryState = {
  query: '',
};

const searchQuerySlice = createSlice({
  name: 'searchQuery',
  initialState: initialSearchQueryState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
  },
});



export const { setSearchQuery } = searchQuerySlice.actions;

export default searchQuerySlice.reducer;
