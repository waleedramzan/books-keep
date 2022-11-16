import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http.service';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { AddBookListDialogComponent } from '../add-book-list-dialog/add-book-list-dialog.component';
import { find } from 'lodash';
import { ConfirmDialogComponent } from 'src/app/core/dialogs/confirm-dialog/confirm-dialog.component';
import { Book } from 'src/app/core/models/Book';
import { BookList } from 'src/app/core/models/BookList';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  dataSource!: MatTableDataSource<Book>;
  lists: BookList [] = [];
  displayedColumns = ['title', 'year', 'author', 'list', 'favourite', 'actions'];
  isLoading: Boolean = false;

  constructor(
    private dialog: MatDialog,
    private http: HttpService
  ) { }

  ngOnInit(): void {
    this.getBookLists();
  }

  getBookLists() {
    this.isLoading = true;
    this.http.getBooksList().subscribe({
      next: (lists) => {
        this.lists = (lists as BookList []);
        this.getBooks();
      },
      error: (e) => console.error(e)
    });
  }

  getBooks() {
    this.http.getBooks().subscribe({
      next: (books) => {
        const _books = (books as Book []);

        for (let book of _books) {
          const list = find(this.lists, (list: BookList) => list.id === book.list);
          if (list) {
            book.list = {
              id: list.id,
              name: list.name
            };
          }
        }
        this.dataSource = new MatTableDataSource(_books);
        this.isLoading = false;
      },
      error: (e) => console.error(e)
    });
  }

  editBook(book: Book) {
    const addBookDialog = this.dialog.open(AddBookDialogComponent, {
      data: {
        book
      }
    });
    addBookDialog.afterClosed().subscribe((response) => {
      if (response) {
        this.getBookLists();
      }
    });
  }

  openDeleteConfirmation(book: Book) {
    const confirmationDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this book?'
      }
    });
    confirmationDialog.afterClosed().subscribe((response) => {
      if (response) {
        this.deleteBook(book.id);
      }
    });
  }

  deleteBook(bookId: number) {
    this.http.deleteBook(bookId).subscribe({
      next: () => this.getBookLists(),
      error: (e) => console.error(e)
    });
  }

  openAddBookDialog() {
    const addBookDialog = this.dialog.open(AddBookDialogComponent);
    addBookDialog.afterClosed().subscribe((response) => {
      if (response) {
        this.getBookLists();
      }
    });
  }

  openAddListDialog() {
    this.dialog.open(AddBookListDialogComponent);
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource.data = data;
      return;
    }

    this.dataSource.data = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'favourite':
          return compare(a.favourite_count, b.favourite_count, isAsc);
        default:
          return 0;
      }
    });
  }
}