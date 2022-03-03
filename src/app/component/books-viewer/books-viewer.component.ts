import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/model';
import { DataService } from 'src/app/service/data.service';
import { TrackableDataItemComponent } from '../trackable-data-item/trackable-data-item.component';

@Component({
  selector: 'app-books-viewer',
  templateUrl: './books-viewer.component.html',
  styleUrls: ['./books-viewer.component.css'],
})
export class BooksViewerComponent
  extends TrackableDataItemComponent
  implements OnInit
{
  title = 'spreadsheet';
  books: Book[] = [];

  constructor(private dataService: DataService) {
    super();
  }

  ngOnInit(): void {
    this.books = this.dataService.get();
  }

  addBookAt(book: number): void {
    this.dataService.addBookAt(book);
  }
  removeBookAt(book: number): void {
    if (this.books.length === 1) {
      return;
    }
    this.dataService.removeBookAt(book);
  }

  setActive(b: number): void {
    this.dataService.setActiveBook(b);
  }

  save(): void {
    this.dataService.save();
  }
}
