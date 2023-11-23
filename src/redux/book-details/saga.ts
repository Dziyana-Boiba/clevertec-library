import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { api } from '../../api/api';
import { bookExact } from '../../assets/library-data/book-exact';
import { ApiURL } from '../../constants/api-url';
import { BookDetailsType } from '../../types/books';

import { getBookDetailsFailed, getBookDetailsRequest, getBookDetailsSuccess } from './slice';

function* getBookDetails({ payload }: PayloadAction<number>) {
  try {
    /* const { data }: AxiosResponse<BookDetailsType> = yield call(api.get, `${ApiURL.books}/${payload}`); */
    const data = bookExact.find((book) => book.id === Number(payload));

    console.log(payload, typeof payload, data);

    yield put(getBookDetailsSuccess(data ? data : null));
  } catch {
    yield put(getBookDetailsFailed());
  }
}

export function* bookDetailsSaga() {
  yield takeEvery(getBookDetailsRequest.type, getBookDetails);
}
