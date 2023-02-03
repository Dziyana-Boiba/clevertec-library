import './book-page.scss';
import { ReactComponent as SlashIcon } from '../../assets/images/Icon_Slash.svg';
import bookImage from '../../assets/images/book-image.png';
import avatar from '../../assets/images/avatar.png';
import { ReactComponent as StarIcon } from '../../assets/images/Icon_star.svg';
import { ReactComponent as StarEmptyIcon } from '../../assets/images/Icon_star-empty.svg';
import { ReactComponent as CatIcon } from '../../assets/images/Icon_Cat.svg';
import { Button } from '../../components/molecules/button/button';

const image = 'df';
const reviewsData = [
  {
    id: 1,
    avatar: '',
    name: 'Иван Иванов',
    date: '5 января 2019',
    rating: 4,
    text: '',
  },
  {
    id: 2,
    avatar: '',
    name: 'Николай Качков',
    date: '20 июня 2018',
    rating: 4,
    text: 'Учитывая ключевые сценарии поведения, курс на социально-ориентированный национальный проект не оставляет шанса для анализа существующих паттернов поведения. Для современного мира внедрение современных методик предоставляет широкие возможности для позиций, занимаемых участниками в отношении поставленных задач. Как уже неоднократно упомянуто, сделанные на базе интернет-аналитики выводы будут в равной степени предоставлены сами себе. Вот вам яркий пример современных тенденций — глубокий уровень погружения создаёт предпосылки для своевременного выполнения сверхзадачи. И нет сомнений, что акционеры крупнейших компаний, инициированные исключительно синтетически, превращены в посмешище, хотя само их существование приносит несомненную пользу обществу.',
  },
  {
    id: 3,
    avatar: '',
    name: 'Иван Иванов',
    date: '5 января 2019',
    rating: 4,
    text: '',
  },
];

const tableData = [
  [
    {
      id: '1',
      propertyName: 'Издательство',
      valueName: 'Питер',
    },
    {
      id: '2',
      propertyName: 'Год издания',
      valueName: '2019',
    },
    {
      id: '3',
      propertyName: 'Страниц',
      valueName: '288',
    },
    {
      propertyName: 'Переплёт',
      valueName: 'Мягкая обложка',
    },
    {
      id: '4',
      propertyName: 'Формат',
      valueName: '700x100',
    },
  ],
  [
    {
      id: '5',
      propertyName: 'Жанр',
      valueName: 'Компьютерная литература',
    },
    {
      id: '6',
      propertyName: 'Вес',
      valueName: '370 г',
    },
    {
      id: '7',
      propertyName: 'ISBN',
      valueName: '978-5-4461-0923-4',
    },
    {
      id: '8',
      propertyName: 'Изготовитель',
      valueName: 'ООО «Питер Мейл». РФ, 198 206, г. Санкт-Петербург, Петергофское ш, д. 73, лит. А29',
    },
  ],
];

export const BookPage = () => (
  <section className='book-page'>
    <div className='book-page_link_wrapper'>
      <div className='book-page_link'>
        Бизнес книги <SlashIcon className='book-page_link_slash' /> Грокаем алгоритмы. Иллюстрированное пособие для
        программистов и любопытствующих
      </div>
    </div>
    <div className='book-page-center-wrapper'>
      <div className='book-description-container'>
        <div className='book-image'>
          {image === null ? <CatIcon /> : <img src={bookImage} alt='Title page of the book' />}
        </div>
        <div className='book-description'>
          <div className='book-title'>
            Грокаем алгоритмы. Иллюстрированное пособие для программистов и любопытствующих
          </div>
          <div className='book-author'>Адитья Бхаргава, 2019</div>
          <Button>Забронировать</Button>
          <div className='about'>
            <p>О книге</p>
            <div>
              Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
              решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута,
              изучить многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое
              время? Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А
              грокать алгоритмы — это веселое и увлекательное занятие.
              <br />
              <br />
              Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
              алгоритмы — это веселое и увлекательное занятие.
            </div>
          </div>
        </div>
      </div>
      <div className='about-mobile-version'>
        <p className='book-page_block-title'>О книге</p>
        <div>
          Алгоритмы — это всего лишь пошаговые алгоритмы решения задач, и большинство таких задач уже были кем-то
          решены, протестированы и проверены. Можно, конечно, погрузится в глубокую философию гениального Кнута, изучить
          многостраничные фолианты с доказательствами и обоснованиями, но хотите ли вы тратить на это свое время?
          Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
          алгоритмы — это веселое и увлекательное занятие.
          <br />
          <br />
          Откройте великолепно иллюстрированную книгу и вы сразу поймете, что алгоритмы — это просто. А грокать
          алгоритмы — это веселое и увлекательное занятие.
        </div>
      </div>
      <div className='book-rating-container'>
        <p className='book-page_block-title'>Рейтинг</p>
        <div className='rating'>
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarIcon />
          <StarEmptyIcon />
          <span>4.3</span>
        </div>
      </div>
      <div className='book-info'>
        <p className='book-page_block-title'>Подробная информация</p>
        <div className='table-container'>
          <table>
            {tableData[0].map((item: any) => (
              <tr key={item.id}>
                <th>{item.propertyName}</th>
                <td>{item.valueName}</td>
              </tr>
            ))}
          </table>
          <table>
            {tableData[1].map((item: any) => (
              <tr key={item.id}>
                <th>{item.propertyName}</th>
                <td>{item.valueName}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
      <div className='reviews-container'>
        <p className='book-page_block-title'>
          Отзывы<span>2</span>
        </p>
        {reviewsData.map((review: any) => (
          <div key={review.id} className='review-block'>
            <div className='user-info'>
              <img src={avatar} alt='User Avatar' />
              <div className='user-name'>
                <span>{review.name}</span>
                <span>{review.date}</span>
              </div>
            </div>
            <div className='review-rating'>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarEmptyIcon />
            </div>
            <div className='review-text'>{review.text}</div>
          </div>
        ))}
        <Button>оценить книгу</Button>
      </div>
    </div>
  </section>
);
