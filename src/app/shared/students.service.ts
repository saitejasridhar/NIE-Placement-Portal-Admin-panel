import { Injectable } from '@angular/core';
import { Company } from './company';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { CompileSummaryKind } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class StudentService {
  companysRef: AngularFireList<any>;
  companyRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) {}
 

  /* Get company list */
  GetStudentList() {
    return this.firestore.collectionGroup("Details").snapshotChanges();
  }

  GetCompanyStudentList() {
    return this.firestore.collectionGroup("Details").snapshotChanges();
  }


  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}