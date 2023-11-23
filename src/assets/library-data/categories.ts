import { CategoryType } from '../../types/categories';

type Categories = {
  categories: CategoryType[];
};
export const categoriesList: Categories = {
  categories: [
    {
      name: 'Бизнес',
      nameLang: 'categories.BUSINESS',
      path: 'business',
      id: 1,
    },
    {
      name: 'Психология',
      nameLang: 'categories.PSYCHOLOGY',
      path: 'psychology',
      id: 2,
    },
    {
      name: 'Родителям',
      nameLang: 'categories.PARENTS',
      path: 'parents',
      id: 3,
    },
    {
      name: 'Нон-фикшн',
      nameLang: 'categories.NON_FICTION',
      path: 'non-fiction',
      id: 4,
    },
    {
      name: 'Художественная литература',
      nameLang: 'categories.FICTION',
      path: 'fiction',
      id: 5,
    },
    {
      name: 'Программирование',
      nameLang: 'categories.PROGRAMMING',
      path: 'programming',
      id: 6,
    },
    {
      name: 'Хобби',
      nameLang: 'categories.HOBBY',
      path: 'hobby',
      id: 7,
    },
    {
      name: 'Дизайн',
      nameLang: 'categories.DESIGN',
      path: 'design',
      id: 8,
    },
    {
      name: 'Детские',
      nameLang: 'categories.CHILDISH',
      path: 'childish',
      id: 9,
    },
    {
      name: 'Другое',
      nameLang: 'categories.OTHER',
      path: 'other',
      id: 10,
    },
  ],
};
