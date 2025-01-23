import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Contact {
  id: string;
  fullName: string;
  department: string;
  contactList: string[];
  designation: string;
}

interface FavoritesState {
  favorites: Contact[];
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Contact>) {
      state.favorites.push(action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
    //   console.log("Removing contact with ID:", action.payload);
      state.favorites = state.favorites.filter(contact => contact.id !== action.payload);
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
