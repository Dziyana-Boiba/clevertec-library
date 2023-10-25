import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';

import { api } from '../../api/api';
import { ApiURL } from '../../constants/api-url';
import { TOKEN_JWT_LS, USER_ID_LS } from '../../constants/auth';
import { LoginResponse, LoginType } from '../../types/auth';

import { loginDataFailed, loginFailed, loginRequest, loginSuccess } from './slice';

function* loginRequestWorker({ payload }: PayloadAction<LoginType>) {
  yield localStorage.clear();
  try {
    const { data }: AxiosResponse<LoginResponse> = yield call(api.post, ApiURL.login, {
      ...payload,
    });
    const { jwt, user } = data;

    yield localStorage.setItem(TOKEN_JWT_LS, JSON.stringify(jwt));
    yield localStorage.setItem(USER_ID_LS, JSON.stringify(user.id));
    yield put(loginSuccess(user));
  } catch (error) {
    const { response } = error as AxiosError;

    if (response && response.status === 400) {
      yield put(loginDataFailed());
    } else {
      yield put(loginFailed());
    }
  }
}

export function* loginSaga() {
  yield takeLatest(loginRequest.type, loginRequestWorker);
}
