import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksViewerComponent } from './books-viewer.component';

describe('BooksViewerComponent', () => {
  let component: BooksViewerComponent;
  let fixture: ComponentFixture<BooksViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksViewerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
