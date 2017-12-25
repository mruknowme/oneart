import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface News {
  created_at: any;
  date_end: any;
  date_start: any;
  desc_brief: string;
  desc_full: string;
  link: string;
  title: string;
}

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.sass']
})
export class NewsEditComponent implements OnInit {

  newsDocRef: AngularFirestoreDocument<News>;
  news$: Observable<News>;

  public newsEditForm: FormGroup;

  public news: News = {
    created_at: '',
    date_end: '',
    date_start: '',
    desc_brief: '',
    desc_full: '',
    link: '',
    title: ''
  };

  froala = {
    descBrief: {
      options: {
        placeholderText: 'Превью новости'
      }
    },
    descFull: {
      options: {
        placeholderText: 'Полный текст новости'
      }
    }
  };

  constructor(private fb: FormBuilder, private afs: AngularFirestore, @Inject(MAT_DIALOG_DATA) public dialogData: any) {
    this.createGenresEditForm();

    this.newsDocRef = this.afs.doc<News>('news/' + this.dialogData.id);
    this.news$ = this.newsDocRef.valueChanges();
    this.news$.subscribe(data => {
      this.news = data;
    });
  }

  createGenresEditForm() {
    this.newsEditForm = this.fb.group({
      title: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      desc_brief: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(300)] ],
      desc_full: [ '', [Validators.required, Validators.minLength(100), Validators.maxLength(5000)] ],
      link: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-z0-9-]*$')] ],
      date_start: [ '', [Validators.required] ],
      date_end: [ '', [Validators.required] ]
    });
  }

  onSubmit(button, text) {
    if (this.newsEditForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const updatedNews: News = {
        created_at: new Date(),
        title: this.newsEditForm.controls.title.value.trim(),
        desc_brief: this.newsEditForm.controls.desc_brief.value,
        desc_full: this.newsEditForm.controls.desc_full.value,
        link: this.newsEditForm.controls.link.value.trim(),
        date_start: this.newsEditForm.controls.date_start.value,
        date_end: this.newsEditForm.controls.date_end.value
      };
      this.newsDocRef.update(updatedNews);
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  ngOnInit() {}

}
