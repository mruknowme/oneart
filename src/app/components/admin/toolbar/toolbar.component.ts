import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenavEvent = new EventEmitter();

  constructor() {}

  toggleSidenav() {
    this.toggleSidenavEvent.emit(true);
  }

  ngOnInit() {
  }

}
