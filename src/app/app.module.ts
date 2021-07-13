import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './component/book/book.component';
import { RowComponent } from './component/row/row.component';
import { TrackableDataItemComponent } from './component/trackable-data-item/trackable-data-item.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    RowComponent,
    TrackableDataItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
