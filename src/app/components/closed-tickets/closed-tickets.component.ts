import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/shared/company';
import { CompanyService } from 'src/app/shared/company.service';
@Component({
  selector: 'app-closed-tickets',
  templateUrl: './closed-tickets.component.html',
  styleUrls: ['./closed-tickets.component.css']
})
export class ClosedTicketsComponent implements OnInit {
  isHistory:string;
  settings = {
    noDataMessage:"No Tickets to be Resolved",
    mode: 'external',
    columns: {
      Name: {
        title: "Raised By",
        width: '10%'

      },
      USN: {
        title: "USN",
        width: '5%'

      },
      Branch: {
        title: "Branch",
        width: '10%'

      },
      Section: {
        title: "Section",
        filter: false,
        width: '5%'

      },
      Subject: {
        title: "Subject",
        filter: false,
        width: '15%'

      },
      Description: {
        title: "Description",
        filter: false,
        width: '20%'

      },
      Date: {
        title: "Raised at",
        filter: false,
        width:'15%'

      },
      closedon: {
        title: "Closed on",
        filter: false,
        width:'15%'

      },
    },
    delete: {
      deleteButtonContent: 'Completed',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit:false,
      delete:false,
      width: '10%',
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

  constructor(
    public companyService: CompanyService ,    public router: Router,
    ){
  }

  ngOnInit() {

    this.companyService.GetTicketsList().subscribe((actionArray) => {
      this.data = actionArray.map((item) => {
        console.log(item.payload.doc.data()['status'])
       if(item.payload.doc.data()['status']==="Completed"){
          return {
            id: item.payload.doc.id,
            ...(item.payload.doc.data() as any),
          };
        }
      });
      this.data = this.data.filter(function( element ) {
        return element !== undefined;
     });
    });
    }


   back()
  {
    this.router.navigateByUrl('/studenttickets');
  }




  // Method to delete student object
  deleteTicket(ticketid) {
    if (window.confirm('Are sure you want to delete this Ticket ?')) { 
      this.companyService.DeleteTicket(ticketid).then(() => {
      }, error => console.error(error));
    }
  }
}
