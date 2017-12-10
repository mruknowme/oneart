import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
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
  selector: 'app-works-edit',
  templateUrl: './works-edit.component.html',
  styleUrls: ['./works-edit.component.sass']
})
export class WorksEditComponent implements OnInit {

  genresColRef: AngularFirestoreCollection<Genres>;
  genres$: Observable<Genres[]>;

  creatorsColRef: AngularFirestoreCollection<Creators>;
  creators$: Observable<Creators[]>;

  workDocRef: AngularFirestoreDocument<Work>;
  work$: Observable<Work>;

  creatorsOptions: any;
  genreOptions: any;
  workData: any;

  private worksColRef: AngularFirestoreCollection<Work>;

  public worksEditForm: FormGroup;

  public creator: Creators = {
    about: '',
    name: '',
    username: ''
  };
  public genre: Genres = {
    alias: '',
    description: '',
    title: ''
  };

  public work: Work = {
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

  constructor(private fb: FormBuilder, private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.genresColRef = this.afs.collection<Genres>('genres', ref => ref.orderBy('title'));
    this.genres$ = this.genresColRef.valueChanges();
    this.genres$.subscribe(data => this.genreOptions = data);

    this.creatorsColRef = this.afs.collection<Creators>('creators', ref => ref.orderBy('name'));
    this.creators$ = this.creatorsColRef.valueChanges();
    this.creators$.subscribe(data => this.creatorsOptions = data);

    this.createWorksEditForm();

    this.workDocRef = this.afs.doc<Work>('works/' + this.dialogData.id);
    this.work$ = this.workDocRef.valueChanges();
    this.work$.subscribe(data => {
      this.work = data;

      this.creator.username = this.work.creator_username;
      this.genre.alias = this.work.genre_alias;
    });

  }

  createWorksEditForm() {
    this.worksEditForm = this.fb.group({
      creator: ['', [Validators.required]],
      creator_username: ['', [Validators.required]],
      genre: ['', [Validators.required]],
      genre_alias: ['', [Validators.required]],
      title: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(70)] ],
      description: [ '', [Validators.required, Validators.minLength(50), Validators.maxLength(5000)] ],
      price: [ '', [Validators.required, Validators.min(0)] ],
      link: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-z\-_]*$')] ]
    });
  }

  onSubmit(button, text) {
    if (this.worksEditForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const updatedWork: Work = {
        created_at: Date(),
        creator: this.worksEditForm.controls.creator.value.trim(),
        creator_username: this.worksEditForm.controls.creator_username.value.trim(),
        description: this.worksEditForm.controls.description.value,
        genre: this.worksEditForm.controls.genre.value.trim(),
        genre_alias: this.worksEditForm.controls.genre_alias.value.trim(),
        images: [''],
        link: this.worksEditForm.controls.link.value.trim(),
        price: this.worksEditForm.controls.price.value,
        title: this.worksEditForm.controls.title.value.trim()
      };
      this.workDocRef.update(updatedWork);
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  changeGenre() {
    this.genre = this.genreOptions.find(item => item.title === this.worksEditForm.controls.genre.value);
  }

  changeCreator() {
    this.creator = this.creatorsOptions.find(item => item.name === this.worksEditForm.controls.creator.value);
  }

  ngOnInit() {}

}
