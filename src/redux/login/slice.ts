import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TOKEN_JWT_LS } from '../../constants/auth';
import { LoginType, UserType } from '../../types/auth';

type LoginState = {
  data: { token: string | null; identifier: string; password: string; user: UserType | null };
  loading: boolean;
  dataError: boolean;
  error: boolean;
};

const initialState: LoginState = {
  data: {
    token: localStorage.getItem(TOKEN_JWT_LS) || null,
    identifier: '',
    password: '',
    user: null,
  },
  loading: false,
  dataError: false,
  error: false,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    loginRequest: (state, _: PayloadAction<LoginType>) => {
      state.data.token = null;
      state.data.user = null;
      state.dataError = false;
      state.error = false;
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<UserType | null>) => {
      state.data.token = localStorage.getItem(TOKEN_JWT_LS);
      state.data.user = action.payload;
      state.loading = false;
    },
    loginDataFailed: (state) => {
      state.dataError = true;
      state.loading = false;
    },
    loginFailed: (state) => {
      state.error = true;
      state.loading = false;
    },
    clearLoginData: (state) => {
      state.error = false;
    },
  },
});

export const { loginRequest, loginSuccess, loginDataFailed, loginFailed, clearLoginData } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
