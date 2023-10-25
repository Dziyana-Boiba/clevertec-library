import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { api } from '../../api/api';
import { ApiURL } from '../../constants/api-url';
import { ForgotPassType } from '../../types/auth';

import { forgotPassFailed, forgotPassRequest, forgotPassSuccess } from './slice';

function* forgotPassWorker({ payload }: PayloadAction<ForgotPassType>) {
  try {
    yield call(api.post, ApiURL.forgotPass, payload);
    yield put(forgotPassSuccess());
  } catch {
    yield put(forgotPassFailed());
  }
}

export function* forgotPassSaga() {
  yield takeLatest(forgotPassRequest.type, forgotPassWorker);
}
