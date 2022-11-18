import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { BooksComponent } from './books/books.component';



@NgModule({
  declarations: [
    BooksComponent
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    SharedModule
  ],
})
export class BooksModule { }
