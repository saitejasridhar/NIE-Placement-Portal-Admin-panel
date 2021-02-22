import { OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";

import { Audtion } from './../../shared/audtion';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import {MatTableDataSource} from '@angular/material'
import { AudtionService } from './../../shared/audtion.service';

export class Student{
  $key:String;
  atitle:String;
  adate:Date;
  aimage:String;
  adesc:String;
  adesc1:String;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})


export class BookListComponent implements OnInit  {
  display = false;
  p: number = 1;                      // Settup up pagination variable
  Student: Student[];                 // Save students data in Student's array.
  hideWhenNoStudent: boolean = false; // Hide students data table when no student.
  noData: boolean = false;   
  
  dataSource: MatTableDataSource<Audtion>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  BookData: any = [];
  displayedColumns: any[] = [
    '$key',
    'atitle', 
    'adate',
    'adesc',
    'action'
  ];
  
  constructor(public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public crudApi: AudtionService // Inject student CRUD services in constructor.
    ){
  }


  ngOnInit() {
    this.dataState(); // Initialize student's list, when component is ready
    let s = this.crudApi.GetAudtionList(); 
    s.snapshotChanges().subscribe(data => { // Using snapshotChanges() method to retrieve list of data along with metadata($key)
      this.Student = [];
      data.forEach(item => {
        let a = item.payload.toJSON(); 
        a['$key'] = item.key;
        this.Student.push(a as Student);
      })
    })
  }

  
  dataState() {     
    this.crudApi.GetAudtionList().valueChanges().subscribe(data => {
      if(data.length <= 0){
        this.hideWhenNoStudent = false;
        this.noData = true;
      } else {
        this.hideWhenNoStudent = true;
        this.noData = false;
      }
    })
  }

  // Method to delete student object
  deleteStudent(student) {
    if (window.confirm('Are sure you want to delete this student ?')) { // Asking from user before Deleting student data.
      this.crudApi.DeleteAudtion(student.$key) // Using Delete student API to delete student.
    }
  }
}