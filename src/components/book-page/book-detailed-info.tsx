import { useTranslation } from 'react-i18next';

import { BookDetailsType } from '../../types/books';

import './book-detailed-info.scss';

type Props = {
  bookDetails: BookDetailsType | null;
};

export const BookDetailedInfo = ({ bookDetails }: Props) => {
  const { t } = useTranslation();

  return (
    <div className='detailed-info'>
      <p className='book-page_block-title'>{t('main.DETAILED_INFORMATION')}</p>
      <div className='table-container'>
        <table>
          <tr>
            <th>{t('main.PUBLISHER')}</th>
            <td>{bookDetails?.publish}</td>
          </tr>
          <tr>
            <th>{t('main.PUBLICATION_YEAR')}</th>
            <td>{bookDetails?.issueYear}</td>
          </tr>
          <tr>
            <th>{t('main.PAGES')}</th>
            <td>{bookDetails?.pages}</td>
          </tr>
          <tr>
            <th>{t('main.COVER')}</th>
            <td>{bookDetails?.cover}</td>
          </tr>
          <tr>
            <th>{t('main.FORMAT')}</th>
            <td>{bookDetails?.format}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>{t('main.GENRE')}</th>
            <td>{bookDetails?.categories?.map((item: string) => `${item} `)}</td>
          </tr>
          <tr>
            <th>{t('main.WEIGHT')}</th>
            <td>{bookDetails?.weight}</td>
          </tr>
          <tr>
            <th>ISBN</th>
            <td>{bookDetails?.ISBN}</td>
          </tr>
          <tr>
            <th>{t('main.MANUFACTURER')}</th>
            <td>{bookDetails?.producer}</td>
          </tr>
        </table>
      </div>
    </div>
  );
};
