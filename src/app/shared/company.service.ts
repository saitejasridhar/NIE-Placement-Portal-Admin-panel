import { Injectable } from '@angular/core';
import { Company } from './company';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { CompileSummaryKind } from '@angular/compiler';
import { firestore } from 'firebase/app';


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

  GetTicketsList() {
    return this.firestore.collection("Tickets").snapshotChanges();
  }

  /* Update company */
  UpdateCompany(id, company: Company) {
    return this.firestore.doc('Companys/' + id).update({
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
  }).catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete company */
  DeleteCompany(id: string) {
    return this.firestore.doc('Companys/' + id).delete();
  }

  DeleteTicket(id: string) {
    return this.firestore.doc('Tickets/' + id).delete();
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
    return this.firestore.collection('Companys').doc(idcompany).collection("events").doc(id).update({
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

  addplacedstudents(companyid:string,students:Array<string>){
    for(var i in students){
      this.firestore.collection("Companys").doc(companyid).update({
        Placed: firestore.FieldValue.arrayUnion(students[i])
      });
    }
    return this.firestore.collection('Companys').doc(companyid+"sidfkdsn").collection("events").doc("asd").delete();
  }

  moveCompany(idcompany:string){
    return this.firestore.collection('Companys').doc(idcompany).update({
      isHistory:"true"
  }).catch(error => {
      this.errorMgmt(error);
    })
  }

  getisallchecked(){
   return this.firestore.collection('Admin').doc("admin").valueChanges();
}

setisallchecked(istrue:boolean){
  return this.firestore.collection('Admin').doc("admin").update({
    Allow:istrue
  }).catch(error => {
    this.errorMgmt(error);
  })
}

Removeinprogressstudents(companyid:string,students:Array<any>){
  for(var i in students){
    this.firestore.collection("Companys").doc(companyid).update({
      InProgress: firestore.FieldValue.arrayRemove(students[i].id)
    });
  }
  return this.firestore.collection('Companys').doc(companyid+"sidfkdsn").collection("events").doc("asd").delete();
}

Removeinprogressstudents1(companyid:string,students:Array<any>){
  for(var i in students){
    this.firestore.collection("Companys").doc(companyid).update({
      InProgress: firestore.FieldValue.arrayRemove(students[i])
    });
  }
  return this.firestore.collection('Companys').doc(companyid+"sidfkdsn").collection("events").doc("asd").delete();
}

Addinprogressstudents(companyid:string,students:Array<any>){
  for(var i in students){
    this.firestore.collection("Companys").doc(companyid).update({
      InProgress: firestore.FieldValue.arrayUnion(students[i].id)
    });
  }
  return this.firestore.collection('Companys').doc(companyid+"sidfkdsn").collection("events").doc("asd").delete();
}

Addinprogressstudents1(companyid:string,students:Array<any>){
  for(var i in students){
    this.firestore.collection("Companys").doc(companyid).update({
      InProgress: firestore.FieldValue.arrayUnion(students[i])
    });
  }
  return this.firestore.collection('Companys').doc(companyid+"sidfkdsn").collection("events").doc("asd").delete();
}


  Removeplacedstudents(companyid:string,students:Array<string>){
    for(var i in students){
      this.firestore.collection("Companys").doc(companyid).update({
        Placed: firestore.FieldValue.arrayRemove(students[i])
      });
    }
    return this.firestore.collection('Companys').doc(companyid+"sidfkdsn").collection("events").doc("asd").delete();
  }


  Rejectedstudents(companyid:string,studentid:Array<any>){

    for(var i in studentid){
      this.firestore.collection("Companys").doc(companyid).update({
        Rejected: firestore.FieldValue.arrayUnion(studentid[i].id)
      });
    }
    return this.firestore.collection('Companys').doc(companyid+"sidfkdsn").collection("events").doc("asd").delete();
  }


  CompayIDtoName(companyid:string){
    return this.firestore.collection('Companys').doc(companyid).valueChanges();
  }
  
  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}