import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AddBookListDialogComponent } from './dialogs/add-book-list-dialog/add-book-list-dialog.component';
import { AddBookDialogComponent } from './dialogs/add-book-dialog/add-book-dialog.component';



@NgModule({
  declarations: [
    AddBookListDialogComponent,
    AddBookDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule
  ]
})
export class SharedModule { }
