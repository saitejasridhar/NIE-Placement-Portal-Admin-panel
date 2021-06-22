import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/shared/company';
import { CompanyService } from 'src/app/shared/company.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
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
        width: '7%'

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
        width: '20%'

      },
      Description: {
        title: "Description",
        filter: false,
        width: '37%'

      },
      Date: {
        title: "Raised at",
        filter: false,
        width:'20%'

      },
    },

    actions: {
      add: false,
      edit:false,
      width: '5%',
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
    public companyService: CompanyService 
    ){
  }

  ngOnInit() {

    this.companyService.GetTicketsList().subscribe((actionArray) => {
      this.data = actionArray.map((item) => {
          return {
            id: item.payload.doc.id,
            ...(item.payload.doc.data() as any),
          };
      });
      this.data = this.data.filter(function( element ) {
        return element !== undefined;
     });
    });
    }


  // rowclick(data)
  // {
  //   this.router.navigateByUrl('/company-details/'+data);
  // }


  // Method to delete student object
  deleteTicket(ticketid) {
    if (window.confirm('Are sure you want to delete this Ticket ?')) { 
      this.companyService.DeleteTicket(ticketid).then(() => {
      }, error => console.error(error));
    }
  }
}