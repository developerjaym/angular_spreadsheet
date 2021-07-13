import { Component, OnInit } from '@angular/core';
import { TrackableDataItemComponent } from './component/trackable-data-item/trackable-data-item.component';
import { Book } from './model/model';
import { DataService } from './service/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent extends TrackableDataItemComponent implements OnInit {
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
    if(this.books.length > 1) {
      this.dataService.removeBookAt(book);
    }
  }

  save(): void {
    this.dataService.save();
  }
}

