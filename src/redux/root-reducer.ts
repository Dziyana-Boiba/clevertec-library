import { combineReducers } from 'redux';

import { appReducer } from './app-state/slice';
import { bookDetailsReducer } from './book-details/slice';
import { booksReducer } from './books/slice';
import { categoriesReducer } from './categories/slice';
import { forgotPassReducer } from './forgot-pass/slice';
import { loginReducer } from './login/slice';
import { registerReducer } from './registration/slice';
import { resetPassReducer } from './reset-pass/slice';

export const rootReducer = combineReducers({
  appState: appReducer,
  categories: categoriesReducer,
  books: booksReducer,
  bookDetails: bookDetailsReducer,
  login: loginReducer,
  register: registerReducer,
  resetPass: resetPassReducer,
  forgotPass: forgotPassReducer,
});
