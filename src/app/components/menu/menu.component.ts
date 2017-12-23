import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Site {
  address: string;
  email_general: string;
  phone_main: string;
  status?: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  @Output() toggleMapEvent = new EventEmitter();

  public siteDocRef: AngularFirestoreDocument<Site>;
  site$: Observable<Site>;

  public site: Site = {
    address: '',
    email_general: 'info@oneart.ru',
    phone_main: '+7(342) 299 99 99',
    status: true
  };

  public mobileMenuOpen = false;

  constructor(private afs: AngularFirestore) {
    this.siteDocRef = this.afs.doc<Site>('site/7gvZVdP6STrS7yK0cqeW');
    this.site$ = this.siteDocRef.valueChanges();
    this.site$.subscribe(data => {
      this.site = data;
    });
  }

  toggleMap(event) {
    if (event.target === event.currentTarget) {
      // this.buyFormOpen = !this.buyFormOpen;
      this.toggleMapEvent.emit(true);
    }
  }

  ngOnInit() {
  }

}
