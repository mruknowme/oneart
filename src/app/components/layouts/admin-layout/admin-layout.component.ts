import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.sass'],
  encapsulation: ViewEncapsulation.None
})

export class AdminLayoutComponent implements OnInit {

  public innerWidth: number;
  public sidenavOpen: Boolean = true;

  constructor() { }

  toggleSidenav(event) {
    this.sidenavOpen = !this.sidenavOpen;
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 800) {
      this.sidenavOpen = false;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 800) {
      this.sidenavOpen = false;
    } else {
      this.sidenavOpen = true;
    }
  }

}
