import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class AdminLayoutComponent implements OnInit {

  sidenavOpen: Boolean = true;

  constructor() { }

  toggleSidenav(event) {
    this.sidenavOpen = !this.sidenavOpen;
  }

  ngOnInit() {}

}
