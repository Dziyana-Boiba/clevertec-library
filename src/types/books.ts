export type BookingType = {
  id: number;
  order: boolean;
  dateOrder: string | null;
  customerId: number | null;
  customerFirstName: string | null;
  customerLastName: string | null;
};

export type DeliveryType = {
  id: number;
  handed: boolean;
  dateHandedFrom: string | null;
  dateHandedTo: string | null;
  recipientId: number | null;
  recipientFirstName: string | null;
  recipientLastName: string | null;
};

export type CommentType = {
  text: string | null;
  createdAt: string;
  rating: number | null;
  id: number;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
};

export type HistoryType = {
  id: number | null;
  userId: number | null;
};

export type ImageType = {
  url: string | null;
};

export type BookType = {
  issueYear: string | null;
  rating: number | null;
  title: string;
  authors: string[] | null;
  image: ImageType;
  categories: string[] | null;
  id: number;
  booking: BookingType | null;
  delivery: DeliveryType | null;
  histories: HistoryType[] | null;
};

export type BookDetailsType = {
  id: number;
  title: string;
  rating: number | null;
  issueYear: string | null;
  description: string | null;
  publish: string | null;
  pages: string | null;
  cover: string | null;
  weight: string | null;
  format: string | null;
  ISBN: string | null;
  producer: string | null;
  authors: string[] | null;
  images: ImageType[] | null;
  categories: string[];
  comments: CommentType[] | null;
  booking: BookingType | null;
  delivery: DeliveryType | null;
  histories: HistoryType[] | null;
};
