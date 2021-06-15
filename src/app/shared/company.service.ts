import { Injectable } from '@angular/core';
import { Company } from './company';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { CompileSummaryKind } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  companysRef: AngularFireList<any>;
  companyRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase, private firestore: AngularFirestore) {}


AddCompany(company:Company){ 
  return new Promise<any>((resolve, reject) => { 
     this.firestore
         .collection("Companys")
         .add(company)
         .then(
             res => {}, 
             err => alert(err.message)
         )
  }
)}


  /* Get company */
  GetCompany(id: string) {
    const employeeData= this.firestore.collection("Companys").doc(id).valueChanges();
    return employeeData;
  }  

  /* Get company list */
  GetCompanyList() {
    return this.firestore.collection("Companys").snapshotChanges();
  }


  /* Update company */
  UpdateCompany(id, company: Company) {
    return this.firestore.doc('Companys/' + id).set({
      Branch:company.Branch,
        Backlog:company.Backlog,
        ClBacklog:company.ClBacklog,
        Batches:company.Batches,
        Breakdown:company.Breakdown,
        Cgpa:company.Cgpa,
        Ctc:company.Ctc,
        Date:company.Date,
        Description:company.Description,
        Location:company.Location,
        Name:company.Name,
        Offer:company.Offer,
        Roles:company.Roles,
        Skills:company.Skills,
        Tenth:company.Tenth,
        Twelfth:company.Twelfth,
        Tier:company.Tier,
        AppliedStudents:company.AppliedStudents
  }).catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete company */
  DeleteCompany(id: string) {
    return this.firestore.doc('Companys/' + id).delete();
  }

  getEventList(id:string){
    return this.firestore.collection("Companys").doc(id).collection("events").snapshotChanges();
  }

  AddEvent(event:any,id:any){ 
    return new Promise<any>((resolve, reject) => { 
       this.firestore
           .collection("Companys").doc(id).collection("events")
           .add(event)
           .then(
               res => {}, 
               err => alert(err.message)
           )
    }
  )}


   /* Update company */
   UpdateEvent(id:string, event: any,idcompany:string) {
    return this.firestore.collection('Companys').doc(idcompany).collection("events").doc(id).set({
      type:event.type,
        date:event.date,
        description:event.description,
  }).catch(error => {
      this.errorMgmt(error);
    })
  }

  DeleteEvent(id: string,idcompany:string) {
    return this.firestore.collection('Companys').doc(idcompany).collection("events").doc(id).delete();
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}