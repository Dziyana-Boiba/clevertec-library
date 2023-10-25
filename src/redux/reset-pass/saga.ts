import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { api } from '../../api/api';
import { ApiURL } from '../../constants/api-url';
import { ResetPassType } from '../../types/auth';

import { resetPassFailed, resetPassRequest, resetPassSuccess } from './slice';

function* resetPassWorker({ payload }: PayloadAction<ResetPassType>) {
  try {
    const { data } = yield call(api.post, ApiURL.resetPass, payload);

    console.log('RESET-pass success', data);
    yield put(resetPassSuccess());
  } catch {
    console.log('RESET-pass failed');
    yield put(resetPassFailed());
  }
}

export function* resetPassSaga() {
  yield takeLatest(resetPassRequest.type, resetPassWorker);
}
