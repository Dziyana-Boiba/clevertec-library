import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type AppState = {
  isBurgerOpen: boolean;
  ratingDown: boolean;
  search: string;
};

const initialState = {
  isBurgerOpen: false,
  ratingDown: true,
  search: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBurgerOpen: (state) => {
      state.isBurgerOpen = !state.isBurgerOpen;
    },
    setFilter: (state) => {
      state.ratingDown = !state.ratingDown;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
  },
});

export const { setBurgerOpen, setFilter, setSearch } = appSlice.actions;
export const appReducer = appSlice.reducer;
