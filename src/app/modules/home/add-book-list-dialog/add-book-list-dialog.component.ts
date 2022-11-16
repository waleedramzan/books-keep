import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/core/services/http.service';

@Component({
  selector: 'app-add-book-list-dialog',
  templateUrl: './add-book-list-dialog.component.html',
  styleUrls: ['./add-book-list-dialog.component.scss']
})
export class AddBookListDialogComponent {

  form: FormGroup;
  isLoading: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private dialogRef: MatDialogRef<AddBookListDialogComponent>
  ) {
    this.form = this.fb.group({
      name: new FormControl('', [Validators.required])
    });
  }

  addList() {
    if (this.isLoading) { return; }
    this.isLoading = true;

    this.httpService.createBookList(this.form.value)
    .subscribe({
      next: () => {
        this.isLoading = false;
        this.dialogRef.close();
      }, 
      error: () => {
        this.isLoading = false;
      }
    });
  }

}
