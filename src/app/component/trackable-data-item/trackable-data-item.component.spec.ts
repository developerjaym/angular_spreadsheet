import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackableDataItemComponent } from './trackable-data-item.component';

describe('TrackableDataItemComponent', () => {
  let component: TrackableDataItemComponent;
  let fixture: ComponentFixture<TrackableDataItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackableDataItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackableDataItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
