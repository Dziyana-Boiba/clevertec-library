import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { STATUS } from '../../constants/common';
import { ForgotPassType } from '../../types/auth';

export type ForgotPassState = {
  loading: boolean;
  error: boolean;
  status: string | null;
};

const initialState: ForgotPassState = {
  loading: false,
  error: false,
  status: null,
};

export const forgotPassSlice = createSlice({
  name: 'forgotPass',
  initialState,
  reducers: {
    forgotPassRequest: (state, _: PayloadAction<ForgotPassType>) => {
      state.error = false;
      state.loading = true;
      state.status = null;
    },
    forgotPassSuccess: (state) => {
      state.loading = false;
      state.status = STATUS.SUCCESS;
    },
    forgotPassFailed: (state) => {
      state.error = true;
      state.loading = false;
    },
  },
});

export const { forgotPassRequest, forgotPassSuccess, forgotPassFailed } = forgotPassSlice.actions;
export const forgotPassReducer = forgotPassSlice.reducer;
