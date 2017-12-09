import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { WorkAddComponent } from './../work-add/work-add.component';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Creators {
  id: string;
  about: string;
  name: string;
  username: string;
}

@Component({
  selector: 'app-creators',
  templateUrl: './creators.component.html',
  styleUrls: ['./creators.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class CreatorsComponent implements AfterViewInit {

  creatorsColRef: AngularFirestoreCollection<Creators>;
  creators$: Observable<Creators[]>;

  displayedColumns = ['position', 'name', 'weight', 'id'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  lol: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private afs: AngularFirestore) {
    this.creatorsColRef = this.afs.collection<Creators>('creators');
    this.creators$ = this.creatorsColRef.valueChanges();
    console.log(this.creators$.subscribe(data => console.log(data)));
  }

  openDialog() {
    const dialogRef = this.dialog.open(WorkAddComponent, {
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
}

export interface Element {
  name: string;
  position: number;
  weight: number;
  id: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, id: 'Hak7'},
  {position: 2, name: 'Helium', weight: 4.0026, id: 'Hak7'},
  {position: 3, name: 'Lithium', weight: 6.941, id: 'Hak7'},
  {position: 4, name: 'Beryllium', weight: 9.0122, id: 'Hak7'},
  {position: 5, name: 'Boron', weight: 10.811, id: 'Hak7'},
  {position: 6, name: 'Carbon', weight: 12.0107, id: 'Hak7'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, id: 'Hak7'},
  {position: 8, name: 'Oxygen', weight: 15.9994, id: 'Hak7'},
  {position: 9, name: 'Fluorine', weight: 18.9984, id: 'Hak7'},
  {position: 10, name: 'Neon', weight: 20.1797, id: 'Hak7'},
  {position: 11, name: 'Sodium', weight: 22.9897, id: 'Hak7'},
  {position: 12, name: 'Magnesium', weight: 24.305, id: 'Hak7'},
  {position: 13, name: 'Aluminum', weight: 26.9815, id: 'Hak7'},
  {position: 14, name: 'Silicon', weight: 28.0855, id: 'Hak7'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, id: 'Hak7'},
  {position: 16, name: 'Sulfur', weight: 32.065, id: 'Hak7'},
  {position: 17, name: 'Chlorine', weight: 35.453, id: 'Hak7'},
  {position: 18, name: 'Argon', weight: 39.948, id: 'Hak7'},
  {position: 19, name: 'Potassium', weight: 39.0983, id: 'Hak7'},
  {position: 20, name: 'Calcium', weight: 40.078, id: 'Hak7'},
];
