import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
}

@Component({
  selector: 'app-requests-buy-edit',
  templateUrl: './requests-buy-edit.component.html',
  styleUrls: ['./requests-buy-edit.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class RequestsBuyEditComponent implements OnInit {

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

  buyRequest: BuyRequests = {
    email: '',
    message: '',
    name: '',
    phone: '',
    status: '',
    work: ''
  };

  buyRequestsColRef: AngularFirestoreDocument<BuyRequests>;
  buyRequest$: Observable<BuyRequests>;

  requestsBuyEditForm: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.worksColRef = this.afs.collection<Work>('works', ref => ref.orderBy('title'));
    this.works$ = this.worksColRef.valueChanges();
    this.works$.subscribe(data => this.worksOptions = data);

    this.createRequestsBuyAddForm();

    this.buyRequestsColRef = this.afs.doc<BuyRequests>('buy_requests/' + this.dialogData.id);
    this.buyRequest$ = this.buyRequestsColRef.valueChanges();
    this.buyRequest$.subscribe(data => {
      this.buyRequest = data;
    });
  }

  createRequestsBuyAddForm() {
    this.requestsBuyEditForm = this.fb.group({
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
    if (this.requestsBuyEditForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const updatedRequestBuy: BuyRequests = {
        email: this.requestsBuyEditForm.controls.email.value.trim(),
        message: this.requestsBuyEditForm.controls.message.value,
        name: this.requestsBuyEditForm.controls.name.value.trim(),
        phone: this.requestsBuyEditForm.controls.phone.value.trim(),
        status: this.requestsBuyEditForm.controls.status_alias.value.trim(),
        work: this.requestsBuyEditForm.controls.work_link.value.trim()
      };
      this.buyRequestsColRef.update(updatedRequestBuy);
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  changeWork() {
    this.work.link = this.worksOptions.find(item => item.title === this.requestsBuyEditForm.controls.work.value).link;
  }

  changeStatus() {
    this.status = this.statusOptions.find(item => item.status === this.requestsBuyEditForm.controls.status.value).status;
  }

  ngOnInit() {
  }

}
