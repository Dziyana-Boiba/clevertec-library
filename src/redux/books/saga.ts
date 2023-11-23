import { Task } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { api } from '../../api/api';
import { booksArray } from '../../assets/library-data/books';
import { ApiURL } from '../../constants/api-url';
import { BookType } from '../../types/books';

import { getBooksFailed, getBooksRequest, getBooksSuccess } from './slice';

function* getBooks(signal: AbortSignal) {
  try {
    /* const { data }: AxiosResponse<BookType[]> = yield call(api.get, ApiURL.books, { signal }); */

    const data = booksArray.books;

    yield put(getBooksSuccess(data));
  } catch {
    yield put(getBooksFailed());
  }
}

export function* booksListSaga() {
  let apiCall: Task | null = null;
  let abortController = new AbortController();

  while (true) {
    yield take(getBooksRequest.type);
    if (apiCall) {
      abortController.abort();
      yield cancel(apiCall);
      abortController = new AbortController();
    }
    apiCall = yield fork(getBooks, abortController.signal);
  }
}
