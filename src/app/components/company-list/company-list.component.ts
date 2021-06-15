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
  settings = {
    noDataMessage:"No Companies",
    mode: 'external',
    columns: {
      Name: {
        title: "Name",
        filter: false,
        width: '20%'

      },
      Offer: {
        title: "Offering",
        filter: false,
        width: '25%'

      },
      Tier: {
        title: "Category",
        filter: false,
        width: '20%'

      },
      Date: {
        title: "Last Date",
        filter: false,
        width: '20%'

      },
    },

//     actions: {
//   custom: [
//     {
//       name: 'yourAction',
//       title: '<i class="ion-document" title="YourAction"></i>'
//     },
//     {
//       name: 'editAction',
//       title: '<i class="ion-edit" title="Edit"></i>'
//     },
//     {
//       name: 'deleteAction',
//       title: '<i class="far fa-trash-alt" title="delete"></i>'
//     }
//   ],
//   add: false,
//   edit: false,
//   delete: false
// }

    actions: {
      add: false,
      width: '20%',
      position: 'right',
    },
    pager: {
      display: true,
      perPage: 10,
    },
    attr: {
      class: "table table-bordered",
    },
  };
  data: any[];  
  list: Company[];

  constructor(public authService: AuthService,
    public router: Router,
    public ngZone: NgZone,
    public companyService: CompanyService 
    ){
  }

  ngOnInit() {
    this.companyService.GetCompanyList().subscribe((actionArray) => {
      this.data = actionArray.map((item) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as Company),
        };
      });
    });
  }

  rowclick(data)
  {
    this.router.navigateByUrl('/company-details/'+data);
  }

  onEdit(studentid){
    this.router.navigateByUrl('/edit-company/'+studentid);
  }

  // Method to delete student object
  deleteCompany(studentid) {
    if (window.confirm('Are sure you want to delete this company ?')) { 
      this.companyService.DeleteCompany(studentid).then(() => {
      }, error => console.error(error));
    }
  }
}