import { all, spawn } from 'redux-saga/effects';

import { bookDetailsSaga } from './book-details/saga';
import { booksListSaga } from './books/saga';
import { categoriesSaga } from './categories/saga';
import { forgotPassSaga } from './forgot-pass/saga';
import { loginSaga } from './login/saga';
import { registerSaga } from './registration/saga';
import { resetPassSaga } from './reset-pass/saga';

export function* rootSaga() {
  const sagas = [
    categoriesSaga,
    booksListSaga,
    bookDetailsSaga,
    registerSaga,
    loginSaga,
    forgotPassSaga,
    resetPassSaga,
  ];

  yield all(sagas.map((saga) => spawn(saga)));
}
