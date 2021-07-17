import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/model';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  jsonString = '';

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  import(): void {
    const jsonData: Book = JSON.parse(this.jsonString);
    this.dataService.importBook(jsonData);
    this.router.navigate(['']);
  }
}
