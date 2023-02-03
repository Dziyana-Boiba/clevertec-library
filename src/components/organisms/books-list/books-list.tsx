import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './books-list.scss';
import { BookCard } from './book-card';
import Books from '../../../assets/books-data.json';

type Props = {
  isListView: boolean;
};

export const BooksList = ({ isListView }: Props) => {
  const books = Books.business;
  const navigate = useNavigate();
  const openBook = (id: string) => {
    navigate(`${id}`);
  };

  return (
    <div className={isListView ? 'books-list-container' : 'books-table-container'}>
      {books.map((book) => (
        <BookCard book={book} isListView={isListView} onClick={openBook} key={book.id} />
      ))}
    </div>
  );
};
