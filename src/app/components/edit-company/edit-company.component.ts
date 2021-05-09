import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CompanyService } from '../../shared/company.service';
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from "rxjs/operators";
import { NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Company } from 'src/app/shared/company';

export interface Language {
  name: string;
}

export class Student{
  $key:String;
  atitle:String;
  adate:Date;
  aimage:String;
  adesc:String;
}


@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})

export class EditCompanyComponent implements OnInit {
  demo: string = ``;
  path: string='/assets/img/image_placeholder.jpg'
  imgSrc: string='/assets/img/image_placeholder.jpg'
  selectedImage: any = null;
  sel=false;
  visible = true;
  preview=false;
  Student: Student[];                 
  selectable = true;
  removable = true;
  test=true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editCompanyForm: FormGroup;

 

  tet: any;


  ngOnInit() {
    this.submitCompanyForm();
  }

  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
this.sel=true;
console.log(this.sel);
    }
    else {
      this.imgSrc = '/Users/saitejan/Desktop/Aveksha-Admin-login-master/src/assets/image_placeholder.jpg';
      this.selectedImage = null;
this.sel=false
console.log(this.sel);
    }
  }

  title: string = '';
  content: string = '';
  img: string='';


  constructor(
    public fb: FormBuilder,    
    private location: Location,
    private companyService: CompanyService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private storage: AngularFireStorage,
    public ngZone: NgZone,
    public authService: AuthService,
  ) { 

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.companyService.GetCompany(id).valueChanges().subscribe(data => {
      this.languageArray = data.languages;
      this.editCompanyForm.controls['atitle'].setValue(data.atitle);
      this.editCompanyForm.controls['adate'].setValue(data.adate);
      this.editCompanyForm.controls['adesc'].setValue(data.adesc);
      this.imgSrc=data.aimage;
    
    })
  }



  /* Update form */
  submitCompanyForm() {
    this.editCompanyForm = this.fb.group({
      atitle: [''],
      adate: [''],
      aimage:[''],
      adesc: [''],
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
      if(this.sel==false)
      {
        var id = this.actRoute.snapshot.paramMap.get('id');
        this.companyService.GetCompany(id).valueChanges().subscribe(data => {
          this.languageArray = data.languages;
          formValue['aimage']=data.aimage;
        })
          var id = this.actRoute.snapshot.paramMap.get('id');
          if(window.confirm('Are you sure you wanna update?')){
           this.companyService.UpdateCompany(id, this.editCompanyForm.value);
         this.router.navigate(['company-list']);
      }
    }
      else{
        var id = this.actRoute.snapshot.paramMap.get('id');
        var filePath=`userData/${this.selectedImage.name}`;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                formValue['aimage'] = url;
                this.companyService.UpdateCompany(id, this.editCompanyForm.value);   
                this.router.navigate(['company-list']);  
              })
            })
          ).subscribe();
      }
 
  }
  }
}