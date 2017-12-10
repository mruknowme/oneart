import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Site {
  address: string;
  email_general: string;
  phone_main: string;
  status?: boolean;
}

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {

  public siteDocRef: AngularFirestoreDocument<Site>;
  genre$: Observable<Site>;

  public settingsForm: FormGroup;

  public site: Site = {
    address: '',
    email_general: '',
    phone_main: '',
    status: true
  };

  constructor(private fb: FormBuilder, private afs: AngularFirestore, public snackBar: MatSnackBar) {
    this.createSettingsForm();

    this.siteDocRef = this.afs.doc<Site>('site/7gvZVdP6STrS7yK0cqeW');
    this.genre$ = this.siteDocRef.valueChanges();
    this.genre$.subscribe(data => {
      this.site = data;
    });
  }

  createSettingsForm() {
    this.settingsForm = this.fb.group({
      address: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(150)] ],
      email_general: [ '', [Validators.required, Validators.email] ],
      phone_main: [ '', [Validators.required, Validators.minLength(6), Validators.maxLength(30)] ]
    });
  }

  changeSiteStatus() {
    this.site.status = !this.site.status;
    this.siteDocRef.update(this.site);
    this.snackBar.open('Статус сайта изменен!', null, {
      duration: 2000,
    });
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      const updatedSettings: Site = {
        address: this.settingsForm.controls.address.value.trim(),
        email_general: this.settingsForm.controls.email_general.value.trim(),
        phone_main: this.settingsForm.controls.phone_main.value.trim()
      };
      this.siteDocRef.update(updatedSettings);
      this.snackBar.open('Сохранено!', null, {
        duration: 2000,
      });
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  ngOnInit() {
  }

}
