export const formatDate = (date: string) => {
  if (!date) {
    return '';
  }
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const convertedDate = new Date(date).toLocaleDateString('ru-RU', options);

  return convertedDate.replace('.', '');
};
