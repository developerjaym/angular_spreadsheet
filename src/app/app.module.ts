import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './component/book/book.component';
import { RowComponent } from './component/row/row.component';
import { TrackableDataItemComponent } from './component/trackable-data-item/trackable-data-item.component';
import { SheetComponent } from './component/sheet/sheet.component';
import { ExportComponent } from './component/export/export.component';
import { ImportComponent } from './component/import/import.component';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    RowComponent,
    TrackableDataItemComponent,
    SheetComponent,
    ExportComponent,
    ImportComponent
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
