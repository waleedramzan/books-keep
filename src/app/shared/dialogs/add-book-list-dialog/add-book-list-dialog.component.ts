import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookList } from 'src/app/core/models/BookList';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-add-book-list-dialog',
  templateUrl: './add-book-list-dialog.component.html',
  styleUrls: ['./add-book-list-dialog.component.scss']
})
export class AddBookListDialogComponent {

  form: FormGroup;
  isLoading: Boolean = false;
  bookList: BookList;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dialogRef: MatDialogRef<AddBookListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { bookList: BookList },
  ) {
    this.bookList = this.data && this.data.bookList;
    this.form = this.fb.group({
      name: new FormControl(this.bookList && this.bookList.name ? this.bookList.name : '', [Validators.required])
    });
  }

  save() {
    if (this.bookList && this.bookList.id) {
      this.editList(this.bookList.id);
    } else {
      this.addList();
    }
  }

  addList() {
    if (this.isLoading) { return; }
    this.isLoading = true;

    this.httpService.createBookList(this.form.value)
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      }, 
      error: () => {
        this.isLoading = false;
      }
    });
  }

  editList(listId: number) {
    if (this.isLoading) { return; }

    this.isLoading = true;
    this.httpService.updateBookList(listId, this.form.value)
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: (e) => this.isLoading = false
    });
  }

}
