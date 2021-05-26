import { Component, OnInit,ViewChild} from '@angular/core';
import { NgZone } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { CompanyService } from "../../shared/company.service";
import { AngularFireStorage } from "@angular/fire/storage";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { finalize } from "rxjs/operators";
import { Company } from "src/app/shared/company";
import { MatChipInputEvent } from "@angular/material/chips";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
isOpen : boolean = false;
////////////
@ViewChild("resetEventForm") myNgForm: any;
readonly separatorKeysCodes: number[] = [ENTER, COMMA];
selectedBindingType: string;
eventForm: FormGroup;
////////

  constructor() { 
    
  }

  ngOnInit(): void {
    this.submitEventForm();
  }
  //////

  submitEventForm(){

  }
  //////
  openDialog(){
    this.isOpen = true;
  }
  closeDialog(){
    this.isOpen=false;
  }
}
