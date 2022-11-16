import { BookList } from "./BookList";

export interface Book {
  id: number;
  title: string;
  year: number;
  author: string;
  list: BookList | number;
  favourite_count: number;
}