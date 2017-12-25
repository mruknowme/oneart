import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { UploadComponent } from '../upload/upload.component';

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

  creatorsOptions: any;
  genreOptions: any;

  chosenPhotos: string[] = [];

  photoUrl = '';

  froala = {
    options: {
      placeholderText: 'Описание'
    }
  };

  private worksColRef: AngularFirestoreCollection<Work>;

  public worksAddForm: FormGroup;

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

  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    public dialog: MatDialog
  ) {
    this.genresColRef = this.afs.collection<Genres>('genres', ref => ref.orderBy('title'));
    this.genres$ = this.genresColRef.valueChanges();
    this.genres$.subscribe(data => this.genreOptions = data);

    this.creatorsColRef = this.afs.collection<Creators>('creators', ref => ref.orderBy('name'));
    this.creators$ = this.creatorsColRef.valueChanges();
    this.creators$.subscribe(data => this.creatorsOptions = data);

    this.createWorksAddForm();

    this.worksColRef = this.afs.collection<Work>('works');
  }

  createWorksAddForm() {
    this.worksAddForm = this.fb.group({
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
    console.log(this.worksAddForm);
    if (this.worksAddForm.valid) {
      button.textContent = text;
      button.disabled = true;
      if (this.chosenPhotos.length < 1) {
        this.chosenPhotos = ['https://firebasestorage.googleapis.com/v0/b/oneart-28ed5.appspot.com/o/uploads%2Fno-photo.png?alt=media&token=917573fb-5d9a-4248-8685-797e7c3775d4'];
      }
      const newWork: Work = {
        created_at: Date(),
        creator: this.worksAddForm.controls.creator.value.trim(),
        creator_username: this.worksAddForm.controls.creator_username.value.trim(),
        description: this.worksAddForm.controls.description.value,
        genre: this.worksAddForm.controls.genre.value.trim(),
        genre_alias: this.worksAddForm.controls.genre_alias.value.trim(),
        images: this.chosenPhotos,
        link: this.worksAddForm.controls.link.value.trim(),
        price: this.worksAddForm.controls.price.value,
        title: this.worksAddForm.controls.title.value.trim()
      };
      this.worksColRef.add({
        created_at: newWork.created_at,
        creator: newWork.creator,
        creator_username: newWork.creator_username,
        description: newWork.description,
        genre: newWork.genre,
        genre_alias: newWork.genre_alias,
        images: newWork.images,
        link: newWork.link,
        price: newWork.price,
        title: newWork.title
      });
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  changeGenre() {
    this.genre = this.genreOptions.find(item => item.title === this.worksAddForm.controls.genre.value);
  }

  changeCreator() {
    this.creator = this.creatorsOptions.find(item => item.name === this.worksAddForm.controls.creator.value);
  }

  choosePhoto() {
    const dialogRef = this.dialog.open(UploadComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '50%',
      data: { isDialogWindow: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true ? console.log('saved') : console.log('closed, not saved');
    });
    dialogRef.componentInstance.chosenFilesMapped.subscribe(result => {
      this.chosenPhotos = result;
    });
  }

  checkImgUrl(url) {
    console.log(url.substr(0, 7));
  }

  ngOnInit() {}

}
