import { Component } from '@angular/core';
import { routerTransition } from './animations/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [ routerTransition ]
})
export class AppComponent {

  getPage(outlet) {
    return outlet.activatedRouteData['page'] || '';
  }

}
