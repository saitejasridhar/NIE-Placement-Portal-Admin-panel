import { OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { Company } from '../../shared/company';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import {MatTableDataSource} from '@angular/material'
import { CompanyService } from '../../shared/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})


export class CompanyListComponent implements OnInit  {
  p: number = 1;                      // Settup up pagination variable
  datapresent: boolean = true; 
  dataSource: MatTableDataSource<Company>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  list: Company[];

  constructor(public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public companyService: CompanyService 
    ){
  }


  ngOnInit() {
    this.companyService.GetCompanyList().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data() as Company
        } ;      
      })
      if(this.list.length>0)
      {
        this.datapresent=true;
       }
       else{
         this.datapresent=false;
       }});
  }


  
 
  // Method to delete student object
  deleteCompany(studentid) {
    if (window.confirm('Are sure you want to delete this company ?')) { 
      this.companyService.DeleteCompany(studentid).then(() => {
      }, error => console.error(error));
    }
  }
}