import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Creators {
  about: string;
  name: string;
  username: string;
}

@Component({
  selector: 'app-creators-edit',
  templateUrl: './creators-edit.component.html',
  styleUrls: ['./creators-edit.component.sass']
})
export class CreatorsEditComponent implements OnInit {

  private creatorsDocRef: AngularFirestoreDocument<Creators>;
  public creator$: Observable<Creators>;

  public creatorsEditForm: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.createCreatorsEditForm();
    this.creatorsDocRef = this.afs.doc<Creators>('creators/' + this.dialogData.id);
    this.creator$ = this.creatorsDocRef.valueChanges();
  }

  createCreatorsEditForm() {
    this.creatorsEditForm = this.fb.group({
      name: [ '', [Validators.required, Validators.minLength(6), Validators.maxLength(70)] ],
      username: [ '', [Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern('^[a-z\s]*$')] ],
      about: [ '', [Validators.required, Validators.minLength(50), Validators.maxLength(5000)] ],
    });
  }

  onSubmit(button, text) {
    if (this.creatorsEditForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const updatedCreator: Creators = {
        name: this.creatorsEditForm.controls.name.value.trim(),
        username: this.creatorsEditForm.controls.username.value.trim(),
        about: this.creatorsEditForm.controls.about.value
      };
      this.creatorsDocRef.update(updatedCreator);
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  ngOnInit() {
  }

}
