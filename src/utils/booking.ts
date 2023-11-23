import i18n from 'i18next';

import { BookingType, DeliveryType } from '../types/books';

export const bookingMessage = (booking: BookingType | null, delivery: DeliveryType | null) => {
  if (delivery && delivery.dateHandedTo) {
    const date = new Intl.DateTimeFormat('ru-Ru', { day: '2-digit', month: '2-digit' }).format(
      new Date(delivery.dateHandedTo)
    );

    return i18n.t('main.BOOKED_UNTIL', { date });
  }

  if (!booking && !delivery) {
    return i18n.t('main.RESERVE'); /* 'Забронировать' */
  }

  return i18n.t('main.RESERVED');
};
