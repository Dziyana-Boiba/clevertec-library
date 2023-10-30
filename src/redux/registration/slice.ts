import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { STATUS } from '../../constants/common';
import { RegistrationType } from '../../types/auth';

export type AuthState = {
  data: RegistrationType | null;
  loading: boolean;
  dataError: boolean;
  error: boolean;
  status: string | null;
};

const initialState: AuthState = {
  data: {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  },
  loading: false,
  dataError: false,
  error: false,
  status: null,
};

export const registerSlice = createSlice({
  name: 'registartion',
  initialState,
  reducers: {
    registrationRequest: (state, _: PayloadAction<RegistrationType>) => {
      state.loading = true;
      state.error = false;
      state.dataError = false;
      state.status = STATUS.LOADING;
    },
    registrationSuccess: (state) => {
      state.loading = false;
      state.status = STATUS.SUCCESS;
    },
    registrationDataFailed: (state) => {
      state.dataError = true;
      state.loading = false;
      state.status = STATUS.ERROR;
    },
    registrationFailed: (state) => {
      state.error = true;
      state.loading = false;
      state.status = STATUS.ERROR;
    },
  },
});

export const { registrationRequest, registrationSuccess, registrationDataFailed, registrationFailed } =
  registerSlice.actions;
export const registerReducer = registerSlice.reducer;
