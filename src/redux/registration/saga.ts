import { call, put, takeLatest } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { api } from '../../api/api';
import { ApiURL } from '../../constants/api-url';
import { RegistrationType } from '../../types/auth';

import { registrationDataFailed, registrationFailed, registrationRequest, registrationSuccess } from './slice';

function* registrationWorker({ payload }: PayloadAction<RegistrationType>) {
  try {
    const { data } = yield call(api.post, ApiURL.registration, payload);

    console.log('registration success', data);
    yield put(registrationSuccess());
  } catch (error) {
    console.log('registration failed', error);

    const { response } = error as AxiosError;

    if (response?.status === 400) {
      yield put(registrationDataFailed());
    } else {
      yield put(registrationFailed());
    }
  }
}

export function* registerSaga() {
  yield takeLatest(registrationRequest.type, registrationWorker);
}
