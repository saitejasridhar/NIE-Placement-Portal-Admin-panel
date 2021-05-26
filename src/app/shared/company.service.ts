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
        Tier:company.Tier
  }).catch(error => {
      this.errorMgmt(error);
    })
  }


  /* Delete company */
  DeleteCompany(id: string) {
    return this.firestore.doc('Companys/' + id).delete();
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}