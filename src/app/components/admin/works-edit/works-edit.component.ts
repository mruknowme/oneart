import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UploadDialogComponent } from '../upload-dialog/upload-dialog.component';
import * as randomString from 'random-string';

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

  froala = {
    options: {
      placeholderText: 'Описание'
    }
  };

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

  addImgFromUrlBtnEnabled = true;

  imageUrlErrMess = '';

  chosenPhotos: string[] = [];

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    public dialog: MatDialog
  ) {
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

      this.chosenPhotos = data.images;

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
      imgUrl: [''],
      description: [ '', [Validators.required, Validators.minLength(50), Validators.maxLength(5000)] ],
      price: [ '', [Validators.required, Validators.min(0)] ],
      link: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-z\-_]*$')] ]
    });
  }

  onSubmit(button, text) {
    if (this.worksEditForm.valid) {
      button.textContent = text;
      button.disabled = true;
      if (this.chosenPhotos.length < 1) {
        this.chosenPhotos = ['https://firebasestorage.googleapis.com/v0/b/oneart-28ed5.appspot.com/o/uploads%2Fno-photo.png?alt=media&token=917573fb-5d9a-4248-8685-797e7c3775d4'];
      }
      const updatedWork: Work = {
        created_at: Date(),
        creator: this.worksEditForm.controls.creator.value.trim(),
        creator_username: this.worksEditForm.controls.creator_username.value.trim(),
        description: this.worksEditForm.controls.description.value,
        genre: this.worksEditForm.controls.genre.value.trim(),
        genre_alias: this.worksEditForm.controls.genre_alias.value.trim(),
        images: this.chosenPhotos,
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

  choosePhoto() {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '50%',
      data: { isDialogWindow: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true ? console.log('saved') : console.log('closed, not saved');
    });
    dialogRef.componentInstance.chosenFilesMapped.subscribe(result => {
      result.forEach(photo => {
        if (!this.chosenPhotos.includes(photo)) {
          this.chosenPhotos.push(photo);
        }
      });
      // this.chosenPhotos.push(result);
    });
  }

  checkImgUrl() {
    const url = this.worksEditForm.controls.imgUrl.value;
    const protocol = url.substr(0, 8);
    if (protocol !== 'https://') {
      if (protocol !== 'http://') {
        this.imageUrlErrMess = 'Указана ссылка некорректного формата. Ссылка должна начинаться с https://';
      }
      console.log('Not safe!');
      this.imageUrlErrMess = 'Указанная ссылка на изображение не является безопасной!<br>Чтобы использовать именно эту картинку, вначале сохраните ее себе на компьютер затем загрузите на сервер или найдите другую картинку, ссылка на которую начинается с https://';
    } else {
      if (this.chosenPhotos.filter(photo => photo === url).length < 1) {
        this.imageUrlErrMess = '';
        // this.addImgFromUrlBtnEnabled = true;
        this.chosenPhotos.push(url);
      } else {
        this.imageUrlErrMess = 'Это изображение уже добавлено';
      }
    }
    this.worksEditForm.controls.imgUrl.reset();
  }

  removePhoto(url) {
    this.chosenPhotos = this.chosenPhotos.filter(photo => photo !== url);
  }

  errorImg(url) {
    this.chosenPhotos = this.chosenPhotos.filter(photo => photo !== url);
    this.imageUrlErrMess = 'Ссылка не действительна';
  }

  ngOnInit() {}

}
