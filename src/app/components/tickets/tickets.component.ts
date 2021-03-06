import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        width: '20%'

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
    },
    delete: {
      deleteButtonContent: 'Completed',
      confirmDelete: true,
    },
    actions: {
      add: false,
      edit:false,
      width: '10%',
      position: 'right',
      custom: [
        { name: 'viewrecord', title: 'Reply   '}]
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
       if(item.payload.doc.data()['status']==="Pending"){
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


  openclosedtickets()
  {
    this.router.navigateByUrl('/closed-tickets');
  }

  onCustomAction(data){
    window.open("mailto:"+data.data['email']+"?subject="+"Responding to \n"+data.data['Subject']+"&body=Hello \n"+data.data['Name']+" ("+data.data['USN']+") "+" from "+data.data['Branch']+ " branch, we have recieved your ticket with subject \"" +data.data['Subject'] + "\""
  +"on "+data.data['Date']+ ". Responding to the same.", '_self');
  }


  // Method to delete student object
  deleteTicket(ticketid) {
    if (window.confirm('Are sure you want to delete this Ticket ?')) { 
      this.companyService.DeleteTicket(ticketid).then(() => {
      }, error => console.error(error));
    }
  }
}