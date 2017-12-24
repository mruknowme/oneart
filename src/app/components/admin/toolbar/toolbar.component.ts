import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ToolbarComponent implements OnInit {
  @Output() toggleSidenavEvent = new EventEmitter();

  constructor(public authService: AuthService) {}

  toggleSidenav() {
    this.toggleSidenavEvent.emit(true);
  }

  ngOnInit() {
  }

}
