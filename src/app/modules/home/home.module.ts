import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { BooksListComponent } from './books-list/books-list.component';
import { HomeRoutingModule } from './home.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddBookListDialogComponent } from './add-book-list-dialog/add-book-list-dialog.component';
import { AddBookDialogComponent } from './add-book-dialog/add-book-dialog.component';



@NgModule({
  declarations: [
    HomeComponent,
    BooksListComponent,
    AddBookListDialogComponent,
    AddBookDialogComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule
  ],
})
export class HomeModule { }
