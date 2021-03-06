import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {Event} from '../event';

@Injectable({
  providedIn: 'root'
})

export class EventService {
  companysRef: AngularFireList<any>;
  companyRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) {}


AddEvent(event:Event){ 
  return new Promise<any>((resolve, reject) => { 
     this.firestore
         .collection("Announcments")
         .add(event)
         .then(
             res => {}, 
             err => alert(err.message)
         )
  }
)}


  /* Get company */
  GetEvent(id: string) {
    const employeeData= this.firestore.collection("Announcments").doc(id).valueChanges();
    return employeeData;
  }  

  /* Get company list */
  GetEventList() {
    return this.firestore.collection("Announcments").snapshotChanges();
  }


  /* Update company */
  UpdateEvent(id, company: any) {
    return this.firestore.doc('Announcments/' + id).set({
      DateTime:company.DateTime,
      Branch:company.Branch,
      Name:company.Name,
      Description:company.Description,

  }).catch(error => {
      this.errorMgmt(error);
    })
  }


  /* Delete company */
  DeleteEvent(id: string) {
    return this.firestore.doc('Announcments/' + id).delete();
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}