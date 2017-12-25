import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Creators {
  about: string;
  name: string;
  username: string;
}

@Component({
  selector: 'app-creators-add',
  templateUrl: './creators-add.component.html',
  styleUrls: ['./creators-add.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class CreatorsAddComponent implements OnInit {

  public creatorsColRef: AngularFirestoreCollection<Creators>;

  public creatorsAddForm: FormGroup;

  froala = {
    options: {
      placeholderText: 'Биография'
    }
  };

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.createCreatorsAddForm();
    this.creatorsColRef = this.afs.collection<Creators>('creators');
  }

  createCreatorsAddForm() {
    this.creatorsAddForm = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(6), Validators.maxLength(70)] ],
      username: [ '', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^[a-z]*$')] ],
      about: [ '', [Validators.required, Validators.minLength(50), Validators.maxLength(5000)] ],
    });
  }

  onSubmit(button, text) {
    if (this.creatorsAddForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const newCreator: Creators = {
        name: this.creatorsAddForm.controls.name.value.trim(),
        username: this.creatorsAddForm.controls.username.value.trim(),
        about: this.creatorsAddForm.controls.about.value
      };
      this.creatorsColRef.add({
        about: newCreator.about,
        name: newCreator.name,
        username: newCreator.username
      });
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  ngOnInit() {
  }

}
