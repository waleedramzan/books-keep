import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/core/dialogs/confirm-dialog/confirm-dialog.component';
import { BookList } from 'src/app/core/models/BookList';
import { HttpService } from 'src/app/core/services/http.service';
import { AddBookListDialogComponent } from 'src/app/shared/dialogs/add-book-list-dialog/add-book-list-dialog.component';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {
  
  dataSource!: MatTableDataSource<BookList>;
  lists: BookList [] = [];
  displayedColumns = ['id', 'name', 'actions'];
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
        this.dataSource = new MatTableDataSource((lists as BookList []));
        this.isLoading = false;
      },
      error: (e) => {
        console.error(e);
        this.isLoading = false;
      }
    });
  }

  openAddListDialog() {
    const addListDialog = this.dialog.open(AddBookListDialogComponent);
    addListDialog.afterClosed().subscribe((response) => {
      if (response) { this.getBookLists(); }
    });
  }

  editList(bookList: BookList) {
    const addListDialog = this.dialog.open(AddBookListDialogComponent, {
      data: {
        bookList
      }
    });
    addListDialog.afterClosed().subscribe((response) => {
      if (response) { this.getBookLists(); }
    });
  }

  openDeleteConfirmation(bookList: BookList) {
    const confirmationDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Are you sure you want to delete this book list?'
      }
    });
    confirmationDialog.afterClosed().subscribe((response) => {
      if (response) {
        this.deleteBookList(bookList.id);
      }
    });
  }

  deleteBookList(bookListId: number) {
    this.http.deleteBookList(bookListId).subscribe({
      next: () => this.getBookLists(),
      error: (e) => console.error(e)
    });
  }

}
