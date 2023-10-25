import { BookingType, DeliveryType } from '../types/books';

export const bookingMessage = (
  booking: BookingType | null,
  delivery: DeliveryType | null
) => {

  if (delivery && delivery.dateHandedTo) {
    const date = new Intl.DateTimeFormat('ru-Ru', { day: '2-digit', month: '2-digit' }).format(
      new Date(delivery.dateHandedTo)
    );

    return `Занята до ${date}`
  }
  
  if (!booking && !delivery) {
    return 'Забронировать';
  }

  return 'Забронирована'
}
