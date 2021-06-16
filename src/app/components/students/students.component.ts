import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../shared/students.service";

import { Company } from "../../shared/company";
import {CompanyService} from "../../shared/company.service"

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
})
export class StudentsComponent implements OnInit {
  blurbackground: string = "opacity:1";
  isOpen: boolean = false;
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

  settings = {
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
  data: any[];

  constructor(public studentService: StudentService, public companyService:CompanyService) {
    this.placedCname="";
  }
  

  rowclick(event:any) {
    this.openDialog();
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
  this.placedCname= this.placedCname.substring(0, this.placedCname.length - 1);
}
}

  openDialog() {
    this.isOpen = true;
    this.placedCname="";
    this.blurbackground = "opacity:0.1;pointer-events:none;";
  }
  closeDialog() {
    this.isOpen = false;
    this.blurbackground = "opacity:1";
  }

  ngOnInit() {
    this.studentService.GetStudentList().subscribe((actionArray) => {
      this.data = actionArray.map((item) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as Company),
        };
      });
    });
  }
}
