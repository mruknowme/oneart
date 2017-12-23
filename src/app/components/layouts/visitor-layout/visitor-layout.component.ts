import { Component } from '@angular/core';
import { routerTransition } from './../../../animations/index';

@Component({
  selector: 'app-visitor-layout',
  templateUrl: './visitor-layout.component.html',
  styleUrls: ['./visitor-layout.component.sass'],
  animations: [ routerTransition ]
})
export class VisitorLayoutComponent {

  public mapOpen = false;

  toggleMap(event) {
    this.mapOpen = !this.mapOpen;
  }

  getPage(outlet) {
    return outlet.activatedRouteData['page'] || '';
  }

}
