import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SelectedLevelState {
  selectedId: number | null;
}

const initialState: SelectedLevelState = {
  selectedId: null,
};

const selectedLevelSlice = createSlice({
  name: 'selectedLevel',
  initialState,
  reducers: {
    setSelectedId(state, action: PayloadAction<number | null>) {
      state.selectedId = action.payload;
    },
  },
});

export const { setSelectedId } = selectedLevelSlice.actions;
export default selectedLevelSlice.reducer;
