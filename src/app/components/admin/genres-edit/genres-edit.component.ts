import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Genres {
  alias: string;
  description: string;
  title: string;
}

@Component({
  selector: 'app-genres-edit',
  templateUrl: './genres-edit.component.html',
  styleUrls: ['./genres-edit.component.sass']
})
export class GenresEditComponent implements OnInit {

  genreDocRef: AngularFirestoreDocument<Genres>;
  genre$: Observable<Genres>;

  public genresEditForm: FormGroup;

  public genre: Genres = {
    alias: '',
    description: '',
    title: ''
  };

  froala = {
    options: {
      placeholderText: 'Описание'
    }
  };

  constructor(private fb: FormBuilder, private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.createGenresEditForm();

    this.genreDocRef = this.afs.doc<Genres>('genres/' + this.dialogData.id);
    this.genre$ = this.genreDocRef.valueChanges();
    this.genre$.subscribe(data => {
      this.genre = data;
    });
  }

  createGenresEditForm() {
    this.genresEditForm = this.fb.group({
      title: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(70)] ],
      alias: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-z]*$')] ],
      description: [ '', [Validators.required, Validators.minLength(50), Validators.maxLength(5000)] ]
    });
  }

  onSubmit(button, text) {
    if (this.genresEditForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const updatedGenre: Genres = {
        title: this.genresEditForm.controls.title.value.trim(),
        alias: this.genresEditForm.controls.alias.value.trim(),
        description: this.genresEditForm.controls.description.value
      };
      this.genreDocRef.update(updatedGenre);
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  ngOnInit() {}

}
