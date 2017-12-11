import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface News {
  created_at: string;
  date_end: string;
  date_start: string;
  desc_brief: string;
  desc_full: string;
  link: string;
  title: string;
}

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NewsAddComponent implements OnInit {

  public newsColRef: AngularFirestoreCollection<News>;

  public newsAddForm: FormGroup;

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.createNewsAddForm();
    this.newsColRef = this.afs.collection<News>('news');
  }

  createNewsAddForm() {
    this.newsAddForm = this.fb.group({
      title: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)] ],
      desc_brief: [ '', [Validators.required, Validators.minLength(10), Validators.maxLength(300)] ],
      desc_full: [ '', [Validators.required, Validators.minLength(100), Validators.maxLength(5000)] ],
      link: [ '', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern('^[a-z0-9-]*$')] ],
      date_start: [ '', [Validators.required] ],
      date_end: [ '', [Validators.required] ],
    });
  }

  onSubmit(button, text) {
    if (this.newsAddForm.valid) {
      button.textContent = text;
      button.disabled = true;
      const newNews: News = {
        title: this.newsAddForm.controls.title.value.trim(),
        desc_brief: this.newsAddForm.controls.desc_brief.value,
        desc_full: this.newsAddForm.controls.desc_full.value,
        link: this.newsAddForm.controls.link.value.trim(),
        date_start: this.newsAddForm.controls.date_start.value.trim(),
        date_end: this.newsAddForm.controls.date_end.value.trim(),
        created_at: Date()
      };
      this.newsColRef.add({
        title: newNews.title,
        desc_brief: newNews.desc_brief,
        desc_full: newNews.desc_full,
        link: newNews.link,
        date_start: newNews.date_start,
        date_end: newNews.date_end,
        created_at: newNews.created_at
      });
    } else {
      alert('Возникла ошибка! Перезагрузите страницу и попробуйте заново.');
    }
  }

  ngOnInit() {
  }

}
