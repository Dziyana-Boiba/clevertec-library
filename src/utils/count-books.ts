import { BookType } from '../types/books';

export const countBooks = (category: string, booksData: BookType[] | null) => {
  let booksList = [];

  if (booksData) {
    booksList = booksData.filter(({ categories }) => categories && categories.includes(category));
  }

  return booksList.length;
};
