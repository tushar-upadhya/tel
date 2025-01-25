import copiedReducer from '@/features/copiedSlice';
import favoritesReducer from '@/features/favoritesSlice';
import favoriteSearchQuerySlice from '@/features/search/favoriteSearchQuerySlice';
import searchQueryReducer from '@/features/search/searchQuerySlice';
import selectedLevelReducer from '@/features/selectedLevelSlice';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
        favorites: favoritesReducer,
        selectedLevel: selectedLevelReducer,
        searchQuery: searchQueryReducer,
        copied: copiedReducer,
        favoritesSearchQuery:favoriteSearchQuerySlice

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
