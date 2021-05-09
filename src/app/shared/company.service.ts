import { Injectable } from '@angular/core';
import { Company } from './company';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  companysRef: AngularFireList<any>;
  companyRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  /* Create company */
  AddCompany(company: Company) {
    this.companysRef.push({
     atitle: company.atitle,
     adesc: company.adesc,
     adate:company.adate,
     aimage:company.aimage
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Get company */
  GetCompany(id: string) {
    this.companyRef = this.db.object('Companys/' + id);
    return this.companyRef;
  }  

  /* Get company list */
  GetCompanyList() {
    this.companysRef = this.db.list('Companys');
    return this.companysRef;
  }


  /* Update company */
  UpdateCompany(id, company: Company) {
    this.companyRef.update({
        atitle: company.atitle,
        adesc: company.adesc,
        adate:company.adate,
        aimage:company.aimage,
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }


  /* Delete company */
  DeleteCompany(id: string) {
    this.companyRef = this.db.object('Companys/' + id);
    this.companyRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}