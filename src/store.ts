
import favoritesReducer from '@/features/favoritesSlice';
import searchQueryReducer from '@/features/searchQuerySlice';
import selectedLevelReducer from '@/features/selectedLevelSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
        favorites: favoritesReducer,
        selectedLevel: selectedLevelReducer,
      searchQuery: searchQueryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
