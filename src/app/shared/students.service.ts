import { Injectable } from '@angular/core';
import { Company } from './company';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { CompileSummaryKind } from '@angular/compiler';
import { firestore } from 'firebase';

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


  AddPlacedCompany(studentid:string,companyid:string ){
    return this.firestore.collection("students").doc(studentid).collection("Details").doc(studentid).update({
        PlacedAt: firestore.FieldValue.arrayUnion(companyid)
      });;
  }

  RemovePlacedCompany(studentid:string,companyid:string ){
    return this.firestore.collection("students").doc(studentid).collection("Details").doc(studentid).update({
        PlacedAt: firestore.FieldValue.arrayRemove(companyid)
      });;
  }
  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}