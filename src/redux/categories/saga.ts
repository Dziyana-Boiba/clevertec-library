import { Task } from 'redux-saga';
import { call, cancel, fork, put, take } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';

import { api } from '../../api/api';
import { categoriesList } from '../../assets/library-data/categories';
import { ApiURL } from '../../constants/api-url';
import { CategoryType } from '../../types/categories';

import { getCategoriesFailed, getCategoriesRequest, getCategoriesSucces } from './slice';

export function* getCategories(signal: AbortSignal) {
  try {
    /*     const { data }: AxiosResponse<CategoryType[]> = yield call(api.get, ApiURL.categories, {
      signal,
    }); */

    const data = categoriesList.categories;

    yield put(getCategoriesSucces(data));
  } catch {
    yield put(getCategoriesFailed());
  }
}

export function* categoriesSaga() {
  let apiCall: Task | null = null;
  let abortController = new AbortController();

  while (true) {
    yield take(getCategoriesRequest.type);
    if (apiCall) {
      abortController.abort();
      yield cancel(apiCall);
      abortController = new AbortController();
    }
    apiCall = yield fork(getCategories, abortController.signal);
  }
}
