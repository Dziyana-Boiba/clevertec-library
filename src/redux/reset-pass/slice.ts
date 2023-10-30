import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { STATUS } from '../../constants/common';
import { ResetPassType } from '../../types/auth';

export type ResetPassState = {
  data: ResetPassType | null;
  loading: boolean;
  error: boolean;
  status: string | null;
};

const initialState: ResetPassState = {
  data: {
    password: '',
    passwordConfirmation: '',
    code: '',
  },
  loading: false,
  error: false,
  status: null,
};

export const resetPassSlice = createSlice({
  name: 'resetPass',
  initialState,
  reducers: {
    resetPassRequest: (state, _: PayloadAction<ResetPassType>) => {
      state.error = false;
      state.loading = true;
      state.status = null;
    },
    resetPassSuccess: (state) => {
      state.loading = false;
      state.status = STATUS.SUCCESS;
    },
    resetPassFailed: (state) => {
      state.error = true;
      state.loading = false;
    },
    clearResetPassData: (state) => {
      state.error = false;
    },
  },
});

export const { resetPassRequest, resetPassSuccess, resetPassFailed, clearResetPassData } = resetPassSlice.actions;
export const resetPassReducer = resetPassSlice.reducer;
