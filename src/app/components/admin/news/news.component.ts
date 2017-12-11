import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { NewsAddComponent } from '../news-add/news-add.component';
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
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class NewsComponent implements AfterViewInit {

  newsColRef: AngularFirestoreCollection<News>;
  news$: Observable<News[]>;

  displayedColumns = ['title', 'desc_brief', 'link', 'date_start', 'date_end', 'id'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
    this.newsColRef = this.afs.collection<News>('news');
    this.news$ = this.newsColRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as News;
        const id = action.payload.doc.id;
        return { id, ...data};
      });
    });
    this.news$.subscribe(data => this.dataSource.data = data);
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewsAddComponent, {
      width: 'auto',
      height: 'auto',
      minWidth: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      result === true ? console.log('saved') : console.log('closed, not saved');
    });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  edit(id) {
    console.log(id);
    // const dialogRef = this.dialog.open(CreatorsEditComponent, {
    //   width: 'auto',
    //   height: 'auto',
    //   minWidth: '50%',
    //   data: { id: id }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   result === true ? console.log('saved') : console.log('closed, not saved');
    // });
  }

  delete(id) {
    console.log(id);
    // const dialogRef = this.dialog.open(CreatorsDeleteComponent, {
    //   width: 'auto',
    //   height: 'auto',
    //   minWidth: '50%',
    //   data: { id: id }
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //   result === true ? console.log('deleted') : console.log('closed, not deleted');
    // });
  }

}
