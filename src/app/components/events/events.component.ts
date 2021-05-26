import { Component, OnInit } from "@angular/core";
import {FormGroup,FormBuilder,Validators} from "@angular/forms";
import { Event } from "../../shared/event";
import { EventService } from "../../shared/services/events.service";

@Component({
  selector: "app-events",
  templateUrl: "./events.component.html",
  styleUrls: ["./events.component.css"],
})
export class EventsComponent implements OnInit {
  isOpen: boolean = false;
  selectedBindingType: string;
  eventForm: FormGroup;
  test: string = "opacity:1";
  list: Event[];
  isupdate: boolean;
  datapresent: boolean = true;
  id: any;

  constructor(public fb: FormBuilder, public eventService: EventService) {}

  ngOnInit(): void {
    this.submitEventForm();
    this.eventService.GetEventList().subscribe((actionArray) => {
      this.list = actionArray.map((item) => {
        return {
          id: item.payload.doc.id,
          ...(item.payload.doc.data() as Event),
        };
      });
      if (this.list.length > 0) {
        this.datapresent = true;
      } else {
        this.datapresent = false;
      }
    });
  }

  submitEventForm() {
    this.eventForm = this.fb.group({
      Name: ["", [Validators.required]],
      Description: ["", [Validators.required]],
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
    this.isOpen = false;
    this.test = "opacity:1";
  }

  updateEvent(event) {
    this.isupdate = true;
    this.id = event.id;
    this.eventForm.controls["Name"].setValue(event.Name);
    this.eventForm.controls["Description"].setValue(event.Description);
    this.isOpen = true;
    this.test = "opacity:0.1;pointer-events:none;";
  }

  saveEvent(event) {
    if (this.eventForm.valid) {
      this.eventService.UpdateEvent(this.id, this.eventForm.value);
      this.closeDialog();
    }
  }

  addevent(formValue: Event) {
    if (this.eventForm.valid) {
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
