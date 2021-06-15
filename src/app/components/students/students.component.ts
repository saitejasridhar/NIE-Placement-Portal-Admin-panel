import { Component, OnInit } from "@angular/core";
import { StudentService } from "../../shared/students.service";

import { Company } from "../../shared/company";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
})
export class StudentsComponent implements OnInit {
  blurbackground: string = "opacity:1";
  isOpen: boolean = false;
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

  constructor(public studentService: StudentService) {}

  rowclick(event:any) {
    this.openDialog();
    console.log(event.id);
  }

  openDialog() {
    this.isOpen = true;
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
