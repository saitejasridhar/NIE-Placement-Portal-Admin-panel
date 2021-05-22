import { NgZone } from "@angular/core";
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
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

export interface Language {
  name: string;
}

@Component({
  selector: "app-add-company",
  templateUrl: "./add-company.component.html",
  styleUrls: ["./add-company.component.css"],
})
export class AddCompanyComponent implements OnInit {
  offering: Array<string>;

  demo: string = ``;
  loading: boolean = true;

  @ViewChild("fromRTE")
  public value: string = null;

  imgSrc: string = "/assets/image_placeholder.jpg";
  imgSc: string = "";
  selectedImage: any = null;

  display = false;
  preview = false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];

  @ViewChild("resetCompanyForm") myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  companyForm: FormGroup;

 

  

  ////////  CHIPS   //////////

  roles: string[] = [];
  skills: string[] = [];
  batches: string[] = [];

  add(event: MatChipInputEvent, array: Array<string>): void {
    const value = (event.value || "").trim();
    const input = event.input;

    // Add our role
    if (value) {
      array.push(value);
    }

    // Clear the input value
    input.value = "";
  }

  remove(role: any, array: Array<string>): void {
    const index = array.indexOf(role);

    if (index >= 0) {
      array.splice(index, 1);
    }
  }



  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => (this.imgSrc = e.target.result);
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = "/assets/image_placeholder.jpg";
      this.selectedImage = null;
    }
  }

  constructor(
    public fb: FormBuilder,
    private companyService: CompanyService,
    private storage: AngularFireStorage,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.offering = ["Internship", "Full-time", "Internship+FTE"];
  }

  ngOnInit(): void {
    this.companyService.GetCompanyList();
    this.submitCompanyForm();
  }

  toppings = new FormControl();
  toppingList: string[] = ["CSE", "ISE", "ECE", "EEE", "IPE", "ME", "CE"];

  //JOB ROLES

  //   numberFormControl = new FormControl('', [
  //     Validators.min(0),
  //     Validators.max(10),
  //  ]);

  //  branchFormcontrol = new FormControl('', [Validators.required]);

  submitCompanyForm() {
    this.companyForm = this.fb.group({
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
      Ctc: ["", []],
      Location: ["", []],
      Breakdown: ["", []],
      Skills: ["", []],
      Roles: ["", []],
      Batches:["", []]
    });
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.companyForm.controls[controlName].hasError(errorName);
  };

  /* Date */
  formatDate(e: { target: { value: string | number | Date } }) {
    var convertDate = new Date(e.target.value);
    var str;
    str = new Date(convertDate.getTime() + 1000 * 60 * 60 * 24)
      .toISOString()
      .substr(0, 10);
    this.companyForm.get("adate").setValue(str, {
      onlyself: true,
    });
  }

  /* Reset form */
  resetForm() {
    this.imgSrc = "/assets/image_placeholder.jpg";
    this.languageArray = [];
    this.companyForm.reset();
    Object.keys(this.companyForm.controls).forEach((key) => {
      this.companyForm.controls[key].setErrors(null);
    });
  }

  title: string = "";
  content: string = "";
  img: string = "";

  submitCompany(formValue: Company) {
    this.companyForm.value["Roles"] = this.roles;
    this.companyForm.value["Skills"] = this.skills;
    this.companyForm.value["Batches"] = this.batches;
    console.log(this.companyForm.value);
    if (this.companyForm.valid) {
      this.preview = true;
      this.display = true;
      var filePath = `company/${this.selectedImage.name}`;
      const fileRef = this.storage.ref(filePath);
      this.storage
        .upload(filePath, this.selectedImage)
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              formValue["aimage"] = url;
              this.companyService.AddCompany(formValue);
              this.display = false;
              location.reload();
              alert("Upload Succsessfull");
            });
          })
        )
        .subscribe();
      this.resetForm();
    }
  }

  get formControls() {
    return this.companyForm["controls"];
  }
}
