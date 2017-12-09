import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { WorkAddComponent } from './../work-add/work-add.component';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class WorksComponent implements AfterViewInit {

  displayedColumns = ['position', 'name', 'weight', 'symbol', 'id'];
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
  weight: number;
  symbol: string;
  id: string;
}

const ELEMENT_DATA: Element[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H', id: 'Hak7'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He', id: 'Hak7'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li', id: 'Hak7'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be', id: 'Hak7'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B', id: 'Hak7'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C', id: 'Hak7'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N', id: 'Hak7'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O', id: 'Hak7'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F', id: 'Hak7'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne', id: 'Hak7'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na', id: 'Hak7'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg', id: 'Hak7'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al', id: 'Hak7'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si', id: 'Hak7'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P', id: 'Hak7'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S', id: 'Hak7'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl', id: 'Hak7'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar', id: 'Hak7'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K', id: 'Hak7'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca', id: 'Hak7'},
];
