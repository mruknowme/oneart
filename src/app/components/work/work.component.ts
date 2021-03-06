import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import 'rxjs/add/operator/mergeMap';
import { Observable } from 'rxjs/Observable';
import { DragScroll } from 'ngx-drag-scroll';

export interface Work {
  created_at: string;
  creator: string;
  creator_username: string;
  description: string;
  genre: string;
  genre_alias: string;
  images: any;
  link: string;
  price: number;
  title: string;
}

export interface BuyForm {
  name: string;
  phone: string;
  email: string;
  message: string;
  status: string;
  work: string;
  email_admin: string;
  created_at: string;
}

export interface Site {
  address: string;
  email_general: string;
  phone_main: string;
  status?: boolean;
}

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class WorkComponent implements OnInit {

  workRef: AngularFirestoreCollection<Work>;
  work$: Observable<Work[]>;

  public siteDocRef: AngularFirestoreDocument<Site>;
  site$: Observable<Site>;

  buyFormColRef: AngularFirestoreCollection<BuyForm>;

  preview = false;
  previewSrc: string;

  buyFormOpen = false;
  buyFormSubmitted = false;

  private emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  public buyForm: FormGroup;

  public site: Site = {
    address: '',
    email_general: '',
    phone_main: '',
    status: true
  };


  @ViewChild('workImageSlider', {read: DragScroll}) ds: DragScroll;

  constructor(private afs: AngularFirestore, private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    this.workRef = this.afs.collection('works', ref => {
      return ref.where('link', '==', this.activatedRoute.snapshot.params.alias)
                .limit(1);
    });
    this.work$ = this.workRef.valueChanges();

    this.buyFormColRef = this.afs.collection<BuyForm>('buy_requests');

    this.siteDocRef = this.afs.doc<Site>('site/7gvZVdP6STrS7yK0cqeW');
    this.site$ = this.siteDocRef.valueChanges();
    this.site$.subscribe(data => {
      this.site = data;
    });

    this.createBuyForm();
  }

  createBuyForm() {
    this.buyForm = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(70)] ],
      email: [ '', [Validators.required, Validators.pattern(this.emailRegex)] ],
      phone: [ '', [Validators.required, Validators.minLength(6), Validators.maxLength(20),  Validators.pattern('^[+0-9-\(\) ]*$')] ],
      message: [ '', [Validators.required, Validators.minLength(5), Validators.maxLength(5000)] ],
      recaptcha: [ null, [Validators.required] ]
    });
  }

  toggleBuyForm(event) {
    if (event.target === event.currentTarget) {
      this.buyFormOpen = !this.buyFormOpen;
    }
  }

  onBuySubmit() {
    if (this.buyForm.valid) {
      console.log(this.buyForm.value);
      const newBuyRequest: BuyForm = {
        name: this.buyForm.controls.name.value.trim(),
        phone: this.buyForm.controls.phone.value.trim(),
        email: this.buyForm.controls.email.value.trim(),
        message: this.buyForm.controls.message.value,
        status: 'open',
        work: this.activatedRoute.snapshot.params.alias,
        email_admin: this.site.email_general,
        created_at: Date()
      };
      this.buyFormColRef.add({
        name: newBuyRequest.name,
        phone: newBuyRequest.phone,
        email: newBuyRequest.email,
        message: newBuyRequest.message,
        status: newBuyRequest.status,
        work: newBuyRequest.work,
        email_admin: newBuyRequest.email_admin,
        created_at: newBuyRequest.created_at
      });
      this.buyFormSubmitted = true;
    } else {
      console.log('error');
    }
  }

  moveRight() {
    this.ds.moveRight();
  }

  moveLeft() {
    this.ds.moveLeft();
  }

  togglePreview(event, src?) {
    if (event.target === event.currentTarget) {
      this.preview = !this.preview;
      src ? this.previewSrc = src : this.previewSrc = null;
    }
  }

  ngOnInit() {
  }

}
