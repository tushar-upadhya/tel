import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CopiedState {
  copiedNumber: string | null;
}

const initialState: CopiedState = {
  copiedNumber: null,
};

const copiedSlice = createSlice({
  name: 'copied',
  initialState,
  reducers: {
    setCopiedNumber(state, action: PayloadAction<string | null>) {
      state.copiedNumber = action.payload;
    },
  },
});

export const { setCopiedNumber } = copiedSlice.actions;
export default copiedSlice.reducer;
