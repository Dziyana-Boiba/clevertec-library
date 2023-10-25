import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryType } from '../../types/categories';

type CategoriesState = {
  data: CategoryType[] | null;
  loading: boolean;
  error: boolean;
};

const initialState: CategoriesState = {
  loading: false,
  error: false,
  data: null,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategoriesRequest: (state) => {
      state.loading = true;
      state.error = false;
      state.data = null;
    },
    getCategoriesSucces: (state, action: PayloadAction<CategoryType[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    getCategoriesFailed: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { getCategoriesRequest, getCategoriesSucces, getCategoriesFailed } = categoriesSlice.actions;
export const categoriesReducer = categoriesSlice.reducer;
