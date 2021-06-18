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
  blurbackground: string = "opacity:1";
  studentname:String;
  USN:String;
  Sname:String;
  Section:String;
  PreUniQyear:String;
  PreUniMarks:String;
  PreUniInstitute:String;
  PreUniBoard:String;
  PreUni:String;
  PerAddress:String;
  PPhone:String;
  PEmail:String;
  GPhone:String;
  SName:String;
  CurSem:String;
  CurArr:String;
  CurAddress:String;
  ClearArr:String;
  CGPA:String;
  Branch:String;
  Batch:String;
  TenthInstitute:String;
  TenthMarks:String;
  TenthQyear:String;
  TenthBoard:String;
  FName:String;
  resume:String;
  PlacedCompaies:Array<string>;
  placedCname:string;
  isOpenstudent:boolean;
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

  appliedsettings={
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
      select: true,
      custom: [
        { name: 'viewrecord', title:'View' },
      ],
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
    selectMode: 'multi',
    actions: {
      add: false,
      edit: false,
      delete: false,
      select: true,
      custom: [
        { name: 'viewrecord', title:'View' },
      ],
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
  allappliedstudents:any[];
  studentdataplaced: any[];
  studentdataunplaced: any[];
  test2:any[];
  types:Array<string>;
  Name:string;
  applied:Array<String>;
  applied1:Array<string>;
  idstring:String;
  god:boolean;
  placedstudents:Array<string>;
  removeplacedstudents:Array<string>;
  placed:Array<string>;
  unplaced:Array<string>;
  placedinapplied:Array<string>;
  applieduplaced:Array<string>;
  inprog:Array<string>;


  constructor(public companyService: CompanyService,public fb: FormBuilder  ,public eventService: EventService, 
    private actRoute: ActivatedRoute,public router: Router, public studentService:StudentService) { 
       this.types = ["Test", "Interview", "Pre-placement Talk"];
       var id = this.actRoute.snapshot.paramMap.get('id');
       this.companyService.GetCompany(id).subscribe(
         (data:Company) => {
       this.Name= data.Name;
       });
       this.studentdata1=[];
       this.allappliedstudents=[];
       this.placedstudents=[];
       this.placed=[];
       this.unplaced=[];
       this.inprog=[];
       this.removeplacedstudents=[];
       this.placedCname="";
       this.isOpenstudent=false;
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
          this.applied=item.payload.doc.data()['InProgress'];
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
      });
      this.studentService.GetCompanyStudentList().subscribe((actionArray) => {
        this.allappliedstudents = actionArray.map((item) => {
          this.applied1=item.payload.doc.data()['Applied'];
          if(this.applied1.includes(id.toString())){
            return {
              id: item.payload.doc.id,
              ...(item.payload.doc.data() as any),
            };
          }  
        });
        this.allappliedstudents = this.allappliedstudents.filter(function( element ) {
          return element !== undefined;          
       });
      });
     
      this.studentService.GetCompanyStudentList().subscribe((actionArray) => {
        this.studentdataunplaced = actionArray.map((item) => {
          this.unplaced=item.payload.doc.data()['PlacedAt'];
          this.applieduplaced=item.payload.doc.data()['Applied'];
          if(!this.unplaced.includes(id.toString()) && this.applieduplaced.includes(id.toString()) ){
            return {
              id: item.payload.doc.id,
              ...(item.payload.doc.data() as any),
            };
          }  
        });
        this.studentdataunplaced = this.studentdataunplaced.filter(function( element ) {
          return element !== undefined;
       });
      });

      this.studentService.GetCompanyStudentList().subscribe((actionArray) => {
        this.studentdataplaced = actionArray.map((item) => {
          this.placed=item.payload.doc.data()['PlacedAt'];
          if(this.placed.includes(id.toString())){
            return {
              id: item.payload.doc.id,
              ...(item.payload.doc.data() as any),
            };
          }  
        });
        this.studentdataplaced = this.studentdataplaced.filter(function( element ) {
          return element !== undefined;
       });
      });
  }

  onCustomAction(event){
    this.openDialogstudent();
    this.studentname=event.id;
    this.USN= event.USN;
    this.Sname=event.Sname;
    this.Section=event.Section;
    this.PreUniQyear=event.PreUniQyear;
    this.PreUniMarks=event.PreUniMarks;
    this.PreUniInstitute=  event.PreUniInstitute;
    this.PreUniBoard=event.PreUniBoard;
    this.PreUni= event.PreUni;
    this.PerAddress= event.PerAddress;
    this.PPhone=event.PPhone;
    this.PEmail= event.PEmail;
    this.GPhone= event.GPhone;
    this.SName= event.Sname;
    this.FName=event.FName.concat(" ");
    this.CurSem= event.CurSem;
    this.CurArr=  event.CurArr;
    this.CurAddress=event.CurAddress;
    this.ClearArr=event.ClearArr;
    this.CGPA=event.CGPA;
    this.Branch=event.Branch;
    this.Batch=event.Batch;
    this.TenthInstitute=event.TenthInstitute;
    this.TenthMarks=event.TenthMarks;
    this.TenthQyear=event.TenthQyear;
    this.TenthBoard= event.TenthBoard;
    this.resume=event.resume;
    this.PlacedCompaies=event.PlacedAt;

for(var i in this.PlacedCompaies){
  this.companyService.CompayIDtoName(this.PlacedCompaies[i]).subscribe(
    (data:Company) => {
  this.placedCname= this.placedCname.concat(data.Name).concat(", ");
  });
}
  }

  openDialogstudent(){
    this.isOpenstudent=true;  
  }

  closeDialogstudent(){
    this.isOpenstudent=false;
    this.placedCname="";
  }
  openDialog() {
    this.isupdate = false;
    this.isOpen = true;
    this.test = "opacity:0.1;pointer-events:none;";
  }
  closeDialog() {
    this.placedCname="";
    this.isOpen = false;
    this.test = "opacity:1";
  }

  submitEventForm() {
    this.eventForm = this.fb.group({
      type: ["", [Validators.required]],
      date:["", [Validators.required]],
      description: ["", [Validators.required]],
      time: ["", [Validators.required]],
      companyid: [""],
      companyname: [""],
    });
  }


  rowclickremove(event){
    console.log(event);
    if(event.isSelected){
      this.removeplacedstudents.push(event.data.id);
    }
    else{
      const index = this.removeplacedstudents.indexOf(event.data.id, 0);
if (index > -1) {
  this.removeplacedstudents.splice(index, 1);
}
    } 
  }
  rowclick(event){
    console.log(event);
    if(event.isSelected){
      this.placedstudents.push(event.data.id);
    }
    else{
      const index = this.placedstudents.indexOf(event.data.id, 0);
if (index > -1) {
  this.placedstudents.splice(index, 1);
}
    } 

  }

  remove(){

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.companyService.Removeplacedstudents(id,this.removeplacedstudents).then(() => {
    }, error => console.error(error));
    this.companyService.Addinprogressstudents1(id,this.removeplacedstudents).then(() => {
    }, error => console.error(error));

    for(var i in this.removeplacedstudents){
      this.studentService.RemovePlacedCompany(this.removeplacedstudents[i],id).then(() => {
      }, error => console.error(error));
      this.studentService.addInprogress1(this.removeplacedstudents[i],id).then(() => {
      }, error => console.error(error));
    }
  }

  onClick(){
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.companyService.addplacedstudents(id,this.placedstudents).then(() => {
    }, error => console.error(error));

    this.companyService.Removeinprogressstudents1(id,this.placedstudents).then(() => {
    }, error => console.error(error));

    for(var i in this.placedstudents){
      this.studentService.AddPlacedCompany(this.placedstudents[i],id).then(() => {
      }, error => console.error(error));
      this.studentService.removeInprogress1(this.placedstudents[i],id).then(() => {
      }, error => console.error(error));
    }
    console.log(this.placedstudents);

  }

  finish(){

  var id = this.actRoute.snapshot.paramMap.get('id');
 
     
      for(var i in this.allappliedstudents){
      this.studentService.removeInprogress(this.allappliedstudents[i],id).then(() => {
      }, error => console.error(error));
    }   


   this.companyService.Removeinprogressstudents(id,this.allappliedstudents).then(() => {
  }, error => console.error(error));

 
     this.companyService.Rejectedstudents(id,this.studentdataunplaced).then(() => {
     }, error => console.error(error));

     for(var i in this.studentdataunplaced){
      this.studentService.AddrejectedCompany(this.studentdataunplaced[i].id,id).then(() => {
      }, error => console.error(error));
     }

     this.companyService.moveCompany(id).then(() => {
    }, error => console.error(error));
    this.router.navigate(['history']); 
  
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

  back(){
    this.router.navigate(['company-list']);  
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
      this.eventForm.value["companyid"]=this.actRoute.snapshot.paramMap.get('id');
      this.eventForm.value["companyname"]=this.Name;
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
