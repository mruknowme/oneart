import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface Work {
  created_at: string;
  creator: string;
  creator_username: string;
  description: string;
  genre: string;
  genre_alias: string;
  images: string[];
  link: string;
  price: number;
  title: string;
}

export interface BuyRequests {
  email: string;
  message: string;
  name: string;
  phone: string;
  status: string;
  work: string;
  created_at: string;
  email_admin: string;
}

export interface Site {
  address: string;
  email_general: string;
  phone_main: string;
  status?: boolean;
}

@Component({
  selector: 'app-requests-buy-add',
  templateUrl: './requests-buy-add.component.html',
  styleUrls: ['./requests-buy-add.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RequestsBuyAddComponent implements OnInit {

  worksColRef: AngularFirestoreCollection<Work>;
  works$: Observable<Work[]>;

  worksOptions: Work[];

  work: Work = {
    created_at: '',
    creator: '',
    creator_username: '',
    description: '',
    genre: '',
    genre_alias: '',
    images: [''],
    link: '',
    price: 0,
    title: ''
  };

  status = '';

  statusOptions = [
    { status: 'open' },
    { status: 'complete' },
    { status: 'cancel' }
  ];

  buyRequestsColRef: AngularFirestoreCollection<BuyRequests>;

  requestsBuyAddForm: FormGroup;

  public siteDocRef: AngularFirestoreDocument<Site>;
  site$: Observable<Site>;

  public site: Site = {
    address: '',
    email_general: '',
    phone_main: '',
    status: true
  };

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.worksColRef = this.afs.collection<Work>('works', ref => ref.orderBy('title'));
    this.works$ = this.worksColRef.valueChanges();
    this.works$.subscribe(data => this.worksOptions = data);

    this.siteDocRef = this.afs.doc<Site>('site/7gvZVdP6STrS7yK0cqeW');
    this.site$ = this.siteDocRef.valueChanges();
    this.site$.subscribe(data => {
      this.site = data;
    });

    this.createRequestsBuyAddForm();

    this.buyRequestsColRef = this.afs.collection<BuyRequests>('buy_requests');
  }

  createRequestsBuyAddForm() {
    this.requestsBuyAddForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(emailRegex)]],
      message: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(5000)]],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(20), Validators.pattern('^[+0-9-\(\) ]*$')]],
      status: [ '', [Validators.required] ],
      work: [ '', [Validators.required] ],
      work_link: [ '', [Validators.required] ],
      status_alias: [ '', [Validators.required] ]
    });
  }

  onSubmit(button, text) {
    if (this.requestsBuyAddForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const newRequestBuy: BuyRequests = {
        email: this.requestsBuyAddForm.controls.email.value.trim(),
        message: this.requestsBuyAddForm.controls.message.value,
        name: this.requestsBuyAddForm.controls.name.value.trim(),
        phone: this.requestsBuyAddForm.controls.phone.value.trim(),
        status: this.requestsBuyAddForm.controls.status_alias.value.trim(),
        work: this.requestsBuyAddForm.controls.work_link.value.trim(),
        created_at: Date(),
        email_admin: this.site.email_general
      };
      console.log(newRequestBuy);
      this.buyRequestsColRef.add({
        email: newRequestBuy.email,
        message: newRequestBuy.message,
        name: newRequestBuy.name,
        phone: newRequestBuy.phone,
        status: newRequestBuy.status,
        work: newRequestBuy.work,
        created_at: newRequestBuy.created_at,
        email_admin: newRequestBuy.email_admin
      });
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  changeWork() {
    this.work.link = this.worksOptions.find(item => item.title === this.requestsBuyAddForm.controls.work.value).link;
  }

  changeStatus() {
    this.status = this.statusOptions.find(item => item.status === this.requestsBuyAddForm.controls.status.value).status;
  }

  ngOnInit() {
  }

}
