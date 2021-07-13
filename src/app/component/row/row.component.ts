import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { TrackableDataItemComponent } from '../trackable-data-item/trackable-data-item.component';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent extends TrackableDataItemComponent implements OnInit {

  @Input()
  row: String[];

  @Input()
  b: number;
  @Input()
  s: number;
  @Input()
  r: number;

  showingOptions = false;

  constructor(private dataService: DataService) {
    super();
   }

  ngOnInit(): void {
  }

  addRowAt(book: number, sheet: number, row: number): void {
    this.dataService.addRowAt(book, sheet, row);
  }
  removeRowAt(book: number, sheet: number, row: number): void {
    this.dataService.removeRowAt(book, sheet, row);
  }

  getGridTemplateColumns(): string {
    return this.row.map(r => '1fr').join(' ') + ' 44px'
  }
}
