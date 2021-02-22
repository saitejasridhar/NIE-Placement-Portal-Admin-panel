import { Injectable } from '@angular/core';
import { Audtion } from './audtion';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFireDatabaseModule } from 'angularfire2/database';



@Injectable({
  providedIn: 'root'
})

export class AudtionService {
  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  /* Create book */
  AddAudtion(audtion: Audtion) {
    this.booksRef.push({
     atitle: audtion.atitle,
     adesc: audtion.adesc,
     adesc1: audtion.adesc1,
     adate:audtion.adate,
     aimage:audtion.aimage
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Get book */
  GetAudtion(id: string) {
    this.bookRef = this.db.object('Audtions/' + id);
    return this.bookRef;
  }  

  /* Get book list */
  GetAudtionList() {
    this.booksRef = this.db.list('Audtions');
    return this.booksRef;
  }

  /* Update book */
  UpdateAudtion(id, audtion: Audtion) {
    this.bookRef.update({
        atitle: audtion.atitle,
        adesc: audtion.adesc,
        adesc1: audtion.adesc1,
        adate:audtion.adate,
        aimage:audtion.aimage
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete book */
  DeleteAudtion(id: string) {
    this.bookRef = this.db.object('Audtions/' + id);
    this.bookRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}