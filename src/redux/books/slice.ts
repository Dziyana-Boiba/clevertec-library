import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BookType } from '../../types/books';

type BooksState = {
  loading: boolean;
  error: boolean;
  data: BookType[] | null;
};

const initialState: BooksState = {
  loading: false,
  error: false,
  data: null,
};

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    getBooksRequest: (state) => {
      state.loading = true;
      state.error = false;
      state.data = null;
    },
    getBooksSuccess: (state, action: PayloadAction<BookType[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    getBooksFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getBooksRequest, getBooksSuccess, getBooksFailed } = booksSlice.actions;
export const booksReducer = booksSlice.reducer;
