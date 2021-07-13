import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trackable-data-item',
  templateUrl: './trackable-data-item.component.html',
  styleUrls: ['./trackable-data-item.component.css']
})
export class TrackableDataItemComponent {

  @Input()
  showing: true;

  constructor() {}

  trackByIndex(index: number, obj: any): any {
    return index;
  }

}
