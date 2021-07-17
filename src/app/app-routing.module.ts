import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksViewerComponent } from './component/books-viewer/books-viewer.component';
import { ExportComponent } from './component/export/export.component';
import { ImportComponent } from './component/import/import.component';

const routes: Routes = [
  {
    path: '',
    component: BooksViewerComponent,
  },
  {
    path: 'import',
    component: ImportComponent,
  },
  {
    path: 'export/:index',
    component: ExportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
