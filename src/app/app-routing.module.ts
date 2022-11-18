import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from './layout/content-layout/content-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: 'books',
        loadChildren: () =>
          import('./modules/books/books.module').then(m => m.BooksModule)
      },
      {
        path: 'list',
        loadChildren: () =>
          import('./modules/book-list/book-list.module').then(m => m.BookListModule)
      }
    ]
  },
  { path: '**', redirectTo: '/books', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
