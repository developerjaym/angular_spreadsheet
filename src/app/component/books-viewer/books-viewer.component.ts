import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/model';
import { DataService } from 'src/app/service/data.service';
import { TrackableDataItemComponent } from '../trackable-data-item/trackable-data-item.component';

@Component({
  selector: 'app-books-viewer',
  templateUrl: './books-viewer.component.html',
  styleUrls: ['./books-viewer.component.css']
})
export class BooksViewerComponent extends TrackableDataItemComponent implements OnInit {
  title = 'spreadsheet';
  books: Book[] = [];
  activeBook: Book;

  constructor(private dataService: DataService){super();}

  ngOnInit(): void {
    this.books = this.dataService.get();
    this.activeBook = this.books[0];

  }

  addBookAt(book: number): void {
    this.dataService.addBookAt(book);
  }
  removeBookAt(book: number): void {
    if(this.books.length === 1) {
      return;
    }
    if(this.books[book] === this.activeBook) {
      this.dataService.removeBookAt(book);
      this.activeBook = this.books[0];
    }
    else {
      this.dataService.removeBookAt(book);
    }
  }

  save(): void {
    this.dataService.save();
  }

}
