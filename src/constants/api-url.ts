export const API_HOST = 'https://library-cleverland-2jfze.ondigitalocean.app/';

export enum ApiURL {
  registration = '/api/auth/local/register',
  login = '/api/auth/local',
  forgotPass = '/api/auth/forgot-password',
  resetPass = '/api/auth/reset-password',
  categories = '/api/categories',
  books = '/api/books',
  comments = '/api/comments',
  booking = '/api/bookings',
}
