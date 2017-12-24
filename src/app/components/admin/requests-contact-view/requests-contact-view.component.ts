import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface ContactRequest {
  created_at: Date;
  email: string;
  messgae: string;
  name: string;
  phone: string;
}

@Component({
  selector: 'app-requests-contact-view',
  templateUrl: './requests-contact-view.component.html',
  styleUrls: ['./requests-contact-view.component.sass']
})
export class RequestsContactViewComponent implements OnInit {

  contactRequestDocRef: AngularFirestoreDocument<ContactRequest>;
  contactRequest$: Observable<ContactRequest>;

  contactRequest: ContactRequest = {
    created_at: new Date,
    email: '',
    messgae: '',
    name: '',
    phone: ''
  };

  constructor(private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.contactRequestDocRef = this.afs.doc<ContactRequest>('contact_requests/' + this.dialogData.id);
    this.contactRequest$ = this.contactRequestDocRef.valueChanges();
    this.contactRequest$.subscribe(data => this.contactRequest = data);
  }

  ngOnInit() {
  }

}
