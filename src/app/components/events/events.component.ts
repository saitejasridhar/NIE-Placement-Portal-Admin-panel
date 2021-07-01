import { Component, OnInit } from "@angular/core";
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import { Event } from "../../shared/event";
import { EventService } from "../../shared/services/events.service";
import {formatDate } from '@angular/common';

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit {
   data:any[];
   jstoday = '';
  settings = {
    noDataMessage:"No Companies",
    mode: 'external',
    columns: {
      Name: {
        title: "Name",
        filter: false,
        width: '25%'
      },
      Description: {
        title: "Description",
        filter: false,
        width: '40%'
      },
      Branch: {
        title: "Branches",
        filter: false,
        width: '15%'
      },
      DateTime: {
        title: "Time",
        filter: false,
        width: '15%'
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
  isOpen: boolean = false;
  selectedBindingType: string;
  eventForm: FormGroup;
  test: string = "opacity:1";
  list: Event[];
  isupdate: boolean;
  datapresent: boolean = true;
  id: any;
 
  constructor(public fb: FormBuilder, public eventService: EventService) {
   

  }

  ngOnInit(): void {
    this.submitEventForm();
  this.eventService.GetEventList().subscribe((actionArray) => {
    this.data = actionArray.map((item) => {
      return {
        id: item.payload.doc.id,
        ...(item.payload.doc.data() as any),
      };
    });
  });
  }

  toppingList: string[] = ["CSE", "ISE", "ECE", "EEE", "IPE", "ME", "CE"];


  submitEventForm() {
    this.eventForm = this.fb.group({
      Name: ["", [Validators.required]],
      Description: ["", [Validators.required]],
      Branch: ["", [Validators.required]],
      DateTime: ["", []],
    });
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.eventForm.controls[controlName].hasError(errorName);
  };
  //////
  openDialog() {
    this.isupdate = false;
    this.isOpen = true;
    this.test = "opacity:0.1;pointer-events:none;";
  }
  closeDialog() {
    this.eventForm.reset();
    this.isOpen = false;
    this.test = "opacity:1";
  }

  updateEvent(event) {
    this.isupdate = true;
    this.id = event.id;
    this.eventForm.controls["Name"].setValue(event.Name);
    this.eventForm.controls["Description"].setValue(event.Description);
    this.eventForm.controls["Branch"].setValue(event.Branch);
    this.isOpen = true;
    this.test = "opacity:0.1;pointer-events:none;";
  }

  saveEvent(event) {
    if (this.eventForm.valid) {
      const today= new Date();
      this.jstoday = formatDate(today, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
      this.eventForm.value["DateTime"]=this.jstoday;
      this.eventService.UpdateEvent(this.id, this.eventForm.value);
      this.closeDialog();
    }
  }

  addevent(formValue: Event) {
 
    if (this.eventForm.valid) {
      const today= new Date();
      this.jstoday = formatDate(today, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
      this.eventForm.value["DateTime"]=this.jstoday;
      this.eventService.AddEvent(formValue);
      alert("Upload Succsessfull");
      this.closeDialog();
    }
  }

  deleteEvent(studentid) {
    if (window.confirm("Are sure you want to delete this company ?")) {
      this.eventService.DeleteEvent(studentid).then(
        () => {},
        (error) => console.error(error)
      );
    }
  }
}
