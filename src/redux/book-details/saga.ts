import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { api } from '../../api/api';
import { ApiURL } from '../../constants/api-url';
import { BookDetailsType } from '../../types/books';

import { getBookDetailsFailed, getBookDetailsRequest, getBookDetailsSuccess } from './slice';

function* getBookDetails({ payload }: PayloadAction<number>) {
  try {
    const { data }: AxiosResponse<BookDetailsType> = yield call(api.get, `${ApiURL.books}/${payload}`);

    yield put(getBookDetailsSuccess(data));
  } catch {
    yield put(getBookDetailsFailed());
  }
}

export function* bookDetailsSaga() {
  yield takeEvery(getBookDetailsRequest.type, getBookDetails);
}
