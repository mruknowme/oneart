import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface News {
  created_at: string;
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
      link: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-z0-9-]*$')] ]
    });
  }

  onSubmit(button, text) {
    if (this.newsEditForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const updatedNews: News = {
        created_at: Date(),
        title: this.newsEditForm.controls.title.value.trim(),
        desc_brief: this.newsEditForm.controls.desc_brief.value,
        desc_full: this.newsEditForm.controls.desc_full.value,
        link: this.newsEditForm.controls.link.value.trim()
      };
      this.newsDocRef.update(updatedNews);
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  ngOnInit() {}

}
