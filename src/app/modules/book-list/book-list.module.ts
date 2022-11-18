import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksListComponent } from './books-list/books-list.component';
import { BookListRoutingModule } from './book-list.routing';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BooksListComponent
  ],
  imports: [
    CommonModule,
    BookListRoutingModule,
    SharedModule
  ]
})
export class BookListModule { }
