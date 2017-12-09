import { Component } from '@angular/core';
import { routerTransition } from './../../../animations/index';

@Component({
  selector: 'app-visitor-layout',
  templateUrl: './visitor-layout.component.html',
  styleUrls: ['./visitor-layout.component.sass'],
  animations: [ routerTransition ]
})
export class VisitorLayoutComponent {

  getPage(outlet) {
    return outlet.activatedRouteData['page'] || '';
  }

}
