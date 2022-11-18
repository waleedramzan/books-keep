import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Book } from '../models/Book';
import { BookList } from '../models/BookList';

const SERVER_URL = environment.serverUrl;

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getBooksList() {
    return this.http.get(`${SERVER_URL}/lists`);
  }

  getBooks() {
    return this.http.get(`${SERVER_URL}/books`);
  }

  createBookList(body: BookList) {
    return this.http.post(`${SERVER_URL}/lists`, body);
  }

  updateBookList(listId: number, body: BookList) {
    return this.http.put(`${SERVER_URL}/lists/${listId}`, body);
  }

  deleteBookList(listId: number) {
    return this.http.delete(`${SERVER_URL}/lists/${listId}`);
  }

  createBook(body: Book) {
    return this.http.post(`${SERVER_URL}/books`, body);
  }

  updateBook(bookId: number, body: Book) {
    return this.http.put(`${SERVER_URL}/books/${bookId}`, body);
  }

  deleteBook(bookId: number) {
    return this.http.delete(`${SERVER_URL}/books/${bookId}`);
  }
}
