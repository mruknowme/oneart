import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { WorkAddComponent } from './../work-add/work-add.component';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class GenresComponent implements AfterViewInit {

  displayedColumns = ['position', 'name', 'id'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public dialog: MatDialog) {}

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
  id: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', id: 'Hak7'},
  {position: 2, name: 'Helium', id: 'Hak7'},
  {position: 3, name: 'Lithium', id: 'Hak7'},
  {position: 4, name: 'Beryllium', id: 'Hak7'},
  {position: 5, name: 'Boron', id: 'Hak7'},
  {position: 6, name: 'Carbon', id: 'Hak7'},
  {position: 7, name: 'Nitrogen', id: 'Hak7'},
  {position: 8, name: 'Oxygen', id: 'Hak7'},
  {position: 9, name: 'Fluorine', id: 'Hak7'},
  {position: 10, name: 'Neon', id: 'Hak7'},
  {position: 11, name: 'Sodium', id: 'Hak7'},
  {position: 12, name: 'Magnesium', id: 'Hak7'},
  {position: 13, name: 'Aluminum', id: 'Hak7'},
  {position: 14, name: 'Silicon', id: 'Hak7'},
  {position: 15, name: 'Phosphorus', id: 'Hak7'},
  {position: 16, name: 'Sulfur', id: 'Hak7'},
  {position: 17, name: 'Chlorine', id: 'Hak7'},
  {position: 18, name: 'Argon', id: 'Hak7'},
  {position: 19, name: 'Potassium', id: 'Hak7'},
  {position: 20, name: 'Calcium', id: 'Hak7'},
];
