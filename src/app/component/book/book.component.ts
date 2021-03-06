import { Component, Input, OnInit } from '@angular/core';
import { Book, Sheet } from 'src/app/model/model';
import { DataService } from 'src/app/service/data.service';
import { TrackableDataItemComponent } from '../trackable-data-item/trackable-data-item.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent extends TrackableDataItemComponent implements OnInit {

  @Input()
  book: Book;

  @Input()
  b: number;

  constructor(private dataService: DataService) { super(); }

  ngOnInit(): void {
  }

  addSheetAt(book: number, sheet: number, row: number): void {
    this.dataService.addSheetAt(book, sheet);
  }
  removeSheetAt(book: number, sheet: number, row: number): void {
    if(this.book.sheets.length === 1) {
      return;
    }
      this.dataService.removeSheetAt(book, sheet);
  }
  setActive(s: number): void {
    this.dataService.setActiveSheet(this.b, s);
  }
}
