import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/shared/company';
import { EventService } from "../../shared/services/events.service";
import { CompanyService } from '../../shared/company.service';
import { StudentService } from '../../shared/students.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  
  settings = {
    noDataMessage:"No Companies",
    mode: 'external',
    columns: {
      type: {
        title: "Type",
        filter: false,
        width:'30%'

      },
      description: {
        title: "Description",
        filter: false,
        width:'45%'
      },
      date: {
        title: "Date",
        filter: false,
        width:'10%'
      },
      time: {
        title: "Time",
        filter: false,
        width:'10%'
      },
    },
    actions: {
      add: false,
    },
    pager: {
      display: true,
      perPage: 10,
    },
    attr: {
      class: "table table-bordered",
    },
  };

  settings1= {
    columns: {

      USN: {
        title: "USN",
      },
      FName: {
        title: "First Name",
        // filter: false
      },
      PEmail: {
        title: "Email",
      },
      Branch: {
        title: "Branch",
      },
    },

    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    pager: {
      display: true,
      perPage: 10,
    },
    attr: {
      class: "table table-bordered",
    },
  };
  isOpen: boolean = false;
  selectedBindingType: string;
  eventForm: FormGroup;
  test: string = "opacity:1";
  list: Event[];
  isupdate: boolean;
  datapresent: boolean = true;
  id: any;
  data: any[];
  studentdata: any[];
  studentdata1: any[];
  test2:any[];
  types:Array<string>;
  Name:string;
  applied:Array<String>;
  idstring:String;
  god:boolean;

  constructor(public companyService: CompanyService,public fb: FormBuilder  ,public eventService: EventService, 
    private actRoute: ActivatedRoute,public router: Router, public studentService:StudentService) { 
       this.types = ["Test", "Interview", "Pre-placement Talk"];
       var id = this.actRoute.snapshot.paramMap.get('id');
       this.companyService.GetCompany(id).subscribe(
         (data:Company) => {
       this.Name= data.Name;
       });
       this.studentdata1=[];
  }

  ngOnInit(): void {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.submitEventForm();
      this.companyService.getEventList(id).subscribe((actionArray) => {
        this.data = actionArray.map((item) => {
          return {
            id: item.payload.doc.id,
            ...(item.payload.doc.data() as any),
          };
        });
      });
      this.studentService.GetCompanyStudentList().subscribe((actionArray) => {
        this.studentdata = actionArray.map((item) => {
          this.applied=item.payload.doc.data()['Applied'];
          if(this.applied.includes(id.toString())){
            return {
              id: item.payload.doc.id,
              ...(item.payload.doc.data() as any),
            };
          }  
        });
        this.studentdata1 = this.studentdata.filter(function( element ) {
          return element !== undefined;
       });
       console.log(this.studentdata1); 

      });
  }

  openDialog() {
    this.isupdate = false;
    this.isOpen = true;
    this.test = "opacity:0.1;pointer-events:none;";
  }
  closeDialog() {
    this.isOpen = false;
    this.test = "opacity:1";
  }

  submitEventForm() {
    this.eventForm = this.fb.group({
      type: ["", [Validators.required]],
      date:["", [Validators.required]],
      description: ["", [Validators.required]],
      time: ["", [Validators.required]],
    });
  }


  public handleError = (controlName: string, errorName: string) => {
    return this.eventForm.controls[controlName].hasError(errorName);
  };

  formatDate(e: { target: { value: string | number | Date } }) {
    var convertDate = new Date(e.target.value);
    var str;
    str = new Date(convertDate.getTime() + 1000 * 60 * 60 * 24)
      .toISOString()
      .substr(0, 10);
    this.eventForm.get("date").setValue(str, {
      onlyself: true,
    });
  }

  updateEvent(event) {
    console.log(event.id);
    this.isupdate = true;
    this.id = event.id;
    this.eventForm.controls["type"].setValue(event.type);
    this.eventForm.controls["description"].setValue(event.description);
    this.eventForm.controls["date"].setValue(event.date);
    this.eventForm.controls["time"].setValue(event.time);
    this.isOpen = true;
    this.test = "opacity:0.1;pointer-events:none;";
  }

  saveEvent(event) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (this.eventForm.valid) {
      this.companyService.UpdateEvent(this.id,this.eventForm.value,id);
      this.closeDialog();
    }
  }

  addevent(formValue: any) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (this.eventForm.valid) {
      this.companyService.AddEvent(formValue,id);
      alert("Upload Succsessfull");
      this.closeDialog();
    }
  }

 

  onEdit(studentid){
    this.router.navigateByUrl('/edit-company/'+studentid);
  }

  // Method to delete student object
  deleteCompany(studentid) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if (window.confirm('Are sure you want to delete this company ?')) { 
      this.companyService.DeleteEvent(studentid,id).then(() => {
      }, error => console.error(error));
    }
  }


}
