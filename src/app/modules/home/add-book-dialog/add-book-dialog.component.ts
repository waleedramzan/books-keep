import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/core/models/Book';
import { BookList } from 'src/app/core/models/BookList';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss']
})
export class AddBookDialogComponent implements OnInit {

  form: FormGroup;
  isLoading: Boolean = false;
  lists: BookList [] = [];
  book: Book;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dialogRef: MatDialogRef<AddBookDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { book: Book },
  ) {
    this.book = this.data && this.data.book;
    this.form = this.fb.group({
      title: new FormControl(this.book ? this.book.title : '', [Validators.required]),
      year: new FormControl(this.book ? this.book.year : ''),
      author: new FormControl(this.book ? this.book.author : ''),
      list: new FormControl(this.book ? (this.book.list as BookList).id : '', [Validators.required]),
      favourite_count: new FormControl(this.book ? this.book.favourite_count : 0)
    });
  }

  ngOnInit(): void {
    this.getBookLists();
  }

  getBookLists() {
    this.isLoading = true;
    this.httpService.getBooksList().subscribe({
      next: lists => {
        this.lists = (lists as BookList []);
        this.isLoading = false;
      },
      error: (e) => {
        this.isLoading = false;
        console.error(e);
      }
    });
  }

  save() {
    if (this.book && this.book.id) {
      this.editBook(this.book.id);
    } else {
      this.addBook();
    }
  }

  addBook() {
    if (this.isLoading) { return; }

    this.isLoading = true;
    this.httpService.createBook(this.form.value)
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (e) => this.isLoading = false
    });
  }

  editBook(bookId: number) {
    if (this.isLoading) { return; }

    this.isLoading = true;
    this.httpService.updateBook(bookId, this.form.value)
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (e) => this.isLoading = false
    });
  }

}
