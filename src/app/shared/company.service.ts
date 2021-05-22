import { Injectable } from '@angular/core';
import { Company } from './company';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  companysRef: AngularFireList<any>;
  companyRef: AngularFireObject<any>;

  constructor(private firestore: AngularFirestore ) {}

  /* Create company */
  AddCompany(company: Company) {
    return new Promise<any>((resolve, reject) => { 
      this.firestore
          .collection("Companys")
          .add(company)
          .then(
              res => {}, 
              err => reject(err)
          )
   }
)
  }

  /* Get company */
  GetCompany(id: string) {
    return this.firestore.doc('Companys/id');
   
  }  

  /* Get company list */
  GetCompanyList() {
    return this.firestore.collection("Companys");
  }


  /* Update company */
  UpdateCompany(id, company: Company) {
    return this.firestore.collection("Companys").doc(id).update(company);
  }


  /* Delete company */
  DeleteCompany(id: string) {
    return this.firestore.collection("Companys").doc(id).delete();
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}