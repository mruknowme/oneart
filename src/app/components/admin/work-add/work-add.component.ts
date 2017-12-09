import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Genres {
  alias: string;
  description: string;
  title: string;
}
export interface Creators {
  about: string;
  name: string;
  username: string;
}

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

@Component({
  selector: 'app-work-add',
  templateUrl: './work-add.component.html',
  styleUrls: ['./work-add.component.sass']
})
export class WorkAddComponent implements OnInit {

  genresColRef: AngularFirestoreCollection<Genres>;
  genres$: Observable<Genres[]>;

  creatorsColRef: AngularFirestoreCollection<Creators>;
  creators$: Observable<Creators[]>;

  private worksColRef: AngularFirestoreCollection<Creators>;

  public worksAddForm: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.genresColRef = this.afs.collection<Genres>('genres', ref => ref.orderBy('title'));
    this.genres$ = this.genresColRef.valueChanges();

    this.creatorsColRef = this.afs.collection<Creators>('creators', ref => ref.orderBy('name'));
    this.creators$ = this.creatorsColRef.valueChanges();

    this.createWorksAddForm();

    this.worksColRef = this.afs.collection<Creators>('works');
  }

  createWorksAddForm() {
    this.worksAddForm = this.fb.group({
      title: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(70)] ],
      description: [ '', [Validators.required, Validators.minLength(50), Validators.maxLength(5000)] ],
      price: [ '', [Validators.required, Validators.min(0)] ],
      link: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-z\-_]*$')] ]
    });
  }

  onSubmit(button, text) {
    if (this.worksAddForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const newWork: Work = {
        created_at: Date(),
        creator: this.worksAddForm.controls.creator.value.trim(),
        creator_username: this.worksAddForm.controls.creator_username.value.trim(),
        description: this.worksAddForm.controls.description.value,
        genre: this.worksAddForm.controls.genre.value.trim(),
        genre_alias: this.worksAddForm.controls.genre_alias.value.trim(),
        images: [''],
        link: this.worksAddForm.controls.link.value.trim(),
        price: this.worksAddForm.controls.price.value.trim(),
        title: this.worksAddForm.controls.title.value.trim()
      };
      // t
      console.log(newWork);
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  ngOnInit() {
  }

}
