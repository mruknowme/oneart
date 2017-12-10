import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Genres {
  alias: string;
  description: string;
  title: string;
}

@Component({
  selector: 'app-genres-add',
  templateUrl: './genres-add.component.html',
  styleUrls: ['./genres-add.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class GenresAddComponent implements OnInit {

  public genresColRef: AngularFirestoreCollection<Genres>;

  public genresAddForm: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.createGenresAddForm();
    this.genresColRef = this.afs.collection<Genres>('genres');
  }

  createGenresAddForm() {
    this.genresAddForm = this.fb.group({
      title: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(70)] ],
      alias: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-z]*$')] ],
      description: [ '', [Validators.required, Validators.minLength(50), Validators.maxLength(5000)] ],
    });
  }

  onSubmit(button, text) {
    if (this.genresAddForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const newGenre: Genres = {
        title: this.genresAddForm.controls.title.value.trim(),
        alias: this.genresAddForm.controls.alias.value.trim(),
        description: this.genresAddForm.controls.description.value
      };
      this.genresColRef.add({
        title: newGenre.title,
        alias: newGenre.alias,
        description: newGenre.description
      });
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  ngOnInit() {
  }

}
