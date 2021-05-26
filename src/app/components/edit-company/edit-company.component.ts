import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { COMMA, D, ENTER } from '@angular/cdk/keycodes';
import { CompanyService } from '../../shared/company.service';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Company } from 'src/app/shared/company';
import { MatChipInputEvent } from '@angular/material/chips';


@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})

export class EditCompanyComponent implements OnInit {
  demo: string = ``;
  path: string='/assets/img/image_placeholder.jpg'
  imgSrc: String='/assets/img/image_placeholder.jpg'
  selectedImage: any = null;
  sel=false;
  visible = true;
  preview=false;
  selectable = true;
  removable = true;
  test=true;
  data:Company;
  addOnBlur = true;
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editCompanyForm: FormGroup;
  roles: Array<string>;
  skills: Array<string>;
  batches: Array<number>;
   company: Company;
offering:Array<string>;
tiers: Array<string>;

toppingList: string[] = ["CSE", "ISE", "ECE", "EEE", "IPE", "ME", "CE"];
  ngOnInit() {
    this.submitCompanyForm();
        var id = this.actRoute.snapshot.paramMap.get('id');
    this.companyService.GetCompany(id).subscribe(
      (data:Company) => {
        this.editCompanyForm.controls['Name'].setValue(data.Name);
        this.editCompanyForm.controls['Date'].setValue(data.Date);
        this.editCompanyForm.controls['Description'].setValue(data.Description);
        this.editCompanyForm.controls['Backlog'].setValue(data.Backlog);
        this.editCompanyForm.controls['Batches'].setValue("");
        this.editCompanyForm.controls['Branch'].setValue(data.Branch);
        this.editCompanyForm.controls['Breakdown'].setValue(data.Breakdown);
        this.editCompanyForm.controls['Location'].setValue(data.Location);
        this.editCompanyForm.controls['Skills'].setValue("");
        this.editCompanyForm.controls['Roles'].setValue("");
        this.editCompanyForm.controls['Tenth'].setValue(data.Tenth);
        this.editCompanyForm.controls['Twelfth'].setValue(data.Twelfth);
        this.editCompanyForm.controls['Ctc'].setValue(data.Ctc);
        this.editCompanyForm.controls['Offer'].setValue(data.Offer);
        this.editCompanyForm.controls['Cgpa'].setValue(data.Cgpa);
        this.editCompanyForm.controls['Tier'].setValue(data.Tier);
        this.roles= data.Roles;
        this.skills=data.Skills;
        this.batches=data.Batches;
    });
  }


  constructor(
    public fb: FormBuilder,    
    private location: Location,
    private companyService: CompanyService,
    private actRoute: ActivatedRoute,
    private router: Router,
    public ngZone: NgZone,
    public authService: AuthService,
  ) { 
    this.offering = ["Internship", "Full-time", "Internship+FTE"];
    this.tiers = ["Mass","Core","Dream"];

  }


  add(event: MatChipInputEvent, array: Array<any>): void {
    const value = (event.value || "").trim();
    const input = event.input;

    // Add our role
    if (value) {
      array.push(value);
    }

    // Clear the input value
    input.value = "";
  }

  remove(role: any, array: Array<any>): void {
    const index = array.indexOf(role);

    if (index >= 0) {
      array.splice(index, 1);
    }
  }

  /* Update form */ 
  submitCompanyForm() {
    this.editCompanyForm = this.fb.group({
      Name: ["", [Validators.required]],
      Date: ["", [Validators.required]],
      // aimage:['',[Validators.required]],
      Description: ["", [Validators.required]],
      Branch: ["", [Validators.required]],
      Cgpa: ["", [Validators.min(0), Validators.max(10)]],
      Tenth: ["", [Validators.min(0), Validators.max(100)]],
      Twelfth: ["", [Validators.min(0), Validators.max(100)]],
      Backlog: ["", [Validators.min(0)]],
      Offer: ["", []],
      Tier: ["", []],
      Ctc: ["", []],
      Location: ["", []],
      Breakdown: ["", []],
      Skills: ["", []],
      Roles: ["", []],
      Batches:["", []]
    })
  }
  
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editCompanyForm.controls[controlName].hasError(errorName);
  }

  /* Date */
  formatDate(e: { target: { value: string | number | Date; }; }) {
    var convertDate = new Date(e.target.value);
    var str;
    str = new Date(convertDate.getTime() + (1000 * 60 * 60 * 24)).toISOString().substr(0,10);
    this.editCompanyForm.get('adate').setValue(str, {
      onlyself: true
    })
  }

  /* Go to previous page */
  goBack(){
    this.location.back();
  }

  UpdateAudtion(formValue) {
    if (this.editCompanyForm.valid){
      this.editCompanyForm.value["Roles"] = this.roles;
      this.editCompanyForm.value["Skills"] = this.skills;
      this.editCompanyForm.value["Batches"] = this.batches;
      var id = this.actRoute.snapshot.paramMap.get('id');
      this.companyService.UpdateCompany(id, this.editCompanyForm.value);   
      this.router.navigate(['company-list']);  
    }
 
  }
}





