import {NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { AudtionService } from './../../shared/audtion.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormGroup, FormBuilder, Validators,FormControl } from "@angular/forms";
import { finalize } from "rxjs/operators";
import { Audtion } from 'src/app/shared/audtion';
import {NgForm} from '@angular/forms';
import { ToolbarService, LinkService, ImageService, HtmlEditorService, RichTextEditorComponent } from '@syncfusion/ej2-angular-richtexteditor';
import { from } from 'rxjs';
import {ThemePalette} from '@angular/material';
import {ProgressSpinnerMode} from '@angular/material';



export interface Language {
  name: string;
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})


export class AddBookComponent implements OnInit {

  demo: string = ``;
  loading: boolean = true;

  public tools: object = {
    items: [
           'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
           'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
           'LowerCase', 'UpperCase', '|', 'Undo', 'Redo', '|',
           'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
           'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
           'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|']
   };
  
  @ViewChild('fromRTE')
    private rteEle: RichTextEditorComponent;
    public value: string = null;
      rteCreated(): void {
        this.rteEle.element.focus();
    }
    
  imgSrc: string='/assets/image_placeholder.jpg'
  imgSc: string='';
  selectedImage: any = null;

  display = false;
  preview=false;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList: any;
  @ViewChild('resetBookForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  bookForm: FormGroup;



  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
   
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      
    }
    else {
      this.imgSrc = '/assets/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }


  constructor(
    public fb: FormBuilder,
    private bookApi: AudtionService,
    private storage: AngularFireStorage,
    public authService: AuthService,
    public router: Router,
    public ngZone: NgZone
  ) { }


  
  ngOnInit(): void {
  this.bookApi.GetAudtionList();
  this.submitBookForm();
    }


  /* Reactive book form */
  submitBookForm() {
    this.bookForm = this.fb.group({
      atitle: ['', [Validators.required]],
      adate: ['', [Validators.required]],
      aimage:['',[Validators.required]],
      adesc: ['', [Validators.required]],
      adesc1: [''],
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.bookForm.controls[controlName].hasError(errorName);
  }

  
  /* Date */
  formatDate(e: { target: { value: string | number | Date; }; }) {
    var convertDate = new Date(e.target.value);
    var str;
    str = new Date(convertDate.getTime() + (1000 * 60 * 60 * 24)).toISOString().substr(0,10);
    this.bookForm.get('adate').setValue(str, {
      onlyself: true
    })
  }



  /* Reset form */
  resetForm() {
    this.imgSrc='/assets/image_placeholder.jpg';
    this.languageArray = [];
    this.bookForm.reset();
    Object.keys(this.bookForm.controls).forEach(key => {
      this.bookForm.controls[key].setErrors(null)
    });
  }

  title: string = '';
  content: string = '';
  img: string='';

  viewpreview(formValue: Audtion,form:NgForm)
  {
    this.demo= form.value.name;
    this.preview=true;
    this.title = 'Test 1';
    this.content = form.value.name;
    this.img=this.bookForm.value.aimage;
  }

  /* Submit book */
  submitBook(formValue: Audtion,form:NgForm) {
    if (this.bookForm.valid){
      this.preview=true;
      this.display = true;
      var filePath=`audition/${this.selectedImage.name}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['aimage'] = url;
            formValue['adesc1']=form.value.name.toString();
            this.bookApi.AddAudtion(formValue); 
            this.display = false;
            location.reload();
            alert("Upload Succsessfull");

          })
        })
      ).subscribe();
       this.resetForm();
    }
  }

  get formControls() {
    return this.bookForm['controls'];
  }

}
