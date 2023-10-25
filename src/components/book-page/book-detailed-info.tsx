import { BookDetailsType } from '../../types/books';

type Props = {
  bookDetails: BookDetailsType | null;
};

export const BookDetailedInfo = ({ bookDetails }: Props) => (
  <div className='detailed-info'>
    <p className='book-page_block-title'>Подробная информация</p>
    <div className='table-container'>
      <table>
        <tr>
          <th>Издательство</th>
          <td>{bookDetails?.publish}</td>
        </tr>
        <tr>
          <th>Год издания</th>
          <td>{bookDetails?.issueYear}</td>
        </tr>
        <tr>
          <th>Страниц</th>
          <td>{bookDetails?.pages}</td>
        </tr>
        <tr>
          <th>Переплёт</th>
          <td>{bookDetails?.cover}</td>
        </tr>
        <tr>
          <th>Формат</th>
          <td>{bookDetails?.format}</td>
        </tr>
      </table>
      <table>
        <tr>
          <th>Жанр</th>
          <td>{bookDetails?.categories?.map((item: string) => `${item} `)}</td>
        </tr>
        <tr>
          <th>Вес</th>
          <td>{bookDetails?.weight}</td>
        </tr>
        <tr>
          <th>ISBN</th>
          <td>{bookDetails?.ISBN}</td>
        </tr>
        <tr>
          <th>Изготовитель</th>
          <td>{bookDetails?.producer}</td>
        </tr>
      </table>
    </div>
  </div>
);
