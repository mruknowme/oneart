import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

export interface Site {
  address: string;
  email_general: string;
  phone_main: string;
  status?: boolean;
}

@Injectable()
export class AuthService {

  private signInStatusSource = new BehaviorSubject<any>(null);
  signInStatus$ = this.signInStatusSource.asObservable();

  private authProcessingSource = new BehaviorSubject<boolean>(false);
  authProcessingS$ = this.authProcessingSource.asObservable();

  user: Observable<firebase.User>;
  siteStatus: Observable<any>;

  public siteDocRef: AngularFirestoreDocument<Site>;
  site$: Observable<Site>;

  public site: Site = {
    address: '',
    email_general: '',
    phone_main: ''
  };

  constructor(private firebaseAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
    this.user = firebaseAuth.authState;
  }

  getSiteStatus() {
    const db = firebase.firestore();
    const docRef = db.collection('site').doc('7gvZVdP6STrS7yK0cqeW');
    return docRef.get().then(doc => {
      if (doc.exists && doc.data().status) {
        return true;
      } else {
        return false;
      }

    }).catch(err => { console.log(`err`, err); return false; });
  }


  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  login(email: string, password: string) {
    this.authProcessingSource.next(true);
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        this.signInStatusSource.next(err);
        this.authProcessingSource.next(false);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.router.navigate(['admin', 'sign-in']);
  }

}
