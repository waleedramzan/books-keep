import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBookListDialogComponent } from './add-book-list-dialog.component';

describe('AddBookListDialogComponent', () => {
  let component: AddBookListDialogComponent;
  let fixture: ComponentFixture<AddBookListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBookListDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBookListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
