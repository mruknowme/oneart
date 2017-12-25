import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export interface Site {
  address: string;
  email_general: string;
  phone_main: string;
  status?: boolean;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})
export class ContactComponent implements OnInit {

  public contactRequestsColRef: AngularFirestoreCollection<ContactForm>;

  public siteDocRef: AngularFirestoreDocument<Site>;
  site$: Observable<Site>;

  public site: Site = {
    address: '',
    email_general: '',
    phone_main: '',
    status: true
  };

  public contactForm: FormGroup;

  public formSubmitted = false;

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.createContactForm();
    this.contactRequestsColRef = this.afs.collection<ContactForm>('contact_requests');

    this.siteDocRef = this.afs.doc<Site>('site/7gvZVdP6STrS7yK0cqeW');
    this.site$ = this.siteDocRef.valueChanges();
    this.site$.subscribe(data => {
      this.site = data;
    });
  }

  createContactForm() {
    this.contactForm = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(2), Validators.maxLength(30)] ],
      phone: [ '', [Validators.required, Validators.pattern('^[\+]?[0-9\-\(\) ]{6,20}$')] ],
      email: [ '', [Validators.required, Validators.email] ],
      message: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(5000)] ],
      recaptcha: [null, [Validators.required] ]
    });
  }

  onSubmit(button, text) {
    if (this.contactForm.valid) {
      button.textContent = text;
      button.disabled = true;
      this.formSubmitted = true;
      const newRequest: ContactForm = {
        name: this.contactForm.controls.name.value.trim(),
        phone: this.contactForm.controls.phone.value.trim(),
        email: this.contactForm.controls.email.value.trim(),
        message: this.contactForm.controls.message.value.trim()
      };
      this.contactRequestsColRef.add({
        name: newRequest.name,
        phone: newRequest.phone,
        email: newRequest.email,
        message: newRequest.message
      });
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  ngOnInit() {
  }

}
