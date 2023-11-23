import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookDetailsType } from '../../types/books';

type BookDetailedState = {
  data: BookDetailsType | null;
  loading: boolean;
  error: boolean;
  id: string | null;
};

const initialState: BookDetailedState = {
  loading: false,
  error: false,
  data: null,
  id: null,
};

export const bookDetailsSlice = createSlice({
  name: 'book-details',
  initialState,
  reducers: {
    getBookDetailsRequest: (state, action: PayloadAction<string | null>) => {
      state.loading = true;
      state.error = false;
      state.data = null;
      state.id = action.payload;
    },
    getBookDetailsSuccess: (state, action: PayloadAction<BookDetailsType | null>) => {
      state.loading = false;
      state.data = action.payload;
    },
    getBookDetailsFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getBookDetailsRequest, getBookDetailsSuccess, getBookDetailsFailed } = bookDetailsSlice.actions;

export const bookDetailsReducer = bookDetailsSlice.reducer;
