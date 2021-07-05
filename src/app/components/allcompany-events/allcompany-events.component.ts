import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/shared/company.service';

@Component({
  selector: 'app-allcompany-events',
  templateUrl: './allcompany-events.component.html',
  styleUrls: ['./allcompany-events.component.css']
})
export class AllcompanyEventsComponent implements OnInit {

  upcomingevents:any[];
  finishedevents:any[];
  jstoday:String;

  upcomingsettings = {
    noDataMessage:"No Companies",
    mode: 'external',
    columns: {
      companyname: {
        title: "Company",
      },
      type: {
        title: "Event",
      },
      description: {
        title: "About",
      },
      date: {
        title: "Date",
      },
      time: {
        title: "Time",
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      select: false,
      position: 'right'
    },
    pager: {
      display: true,
      perPage: 10,
    },
    attr: {
      class: "table table-bordered",
    },
  };

  finishedsettings={
    columns: {
      companyname: {
        title: "Company",
      },
      type: {
        title: "Event",
      },
      description: {
        title: "About",
      },
      date: {
        title: "Date",
      },
      time: {
        title: "Time",
      },
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      select: false,
      position: 'right'
    },
    pager: {
      display: true,
      perPage: 10,
    },
    attr: {
      class: "table table-bordered",
    },
  };

  constructor(public companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getallEventList().subscribe((actionArray) => {
      this.upcomingevents = actionArray.map((item) => {
        const today= new Date();
        let dateString =  item.payload.doc.data()['date']+ "T"+item.payload.doc.data()['time'];
        let newDate = new Date(dateString);
        if(newDate>today){
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as any),
        };
      }
      });
      this.upcomingevents = this.upcomingevents.filter(function( element ) {
        return element !== undefined;
     });
    });

    

    this.companyService.getallEventList().subscribe((actionArray) => {
      this.finishedevents = actionArray.map((item) => {
        const today= new Date();
        let dateString =  item.payload.doc.data()['date']+ "T"+item.payload.doc.data()['time'];
        let newDate = new Date(dateString);
        if(newDate<today){
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as any),
        };
      }
      });
      this.finishedevents = this.finishedevents.filter(function( element ) {
        return element !== undefined;
     });
    });
  }

  

}
