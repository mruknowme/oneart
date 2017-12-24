import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private signInStatusSource = new BehaviorSubject<any>(null);
  signInStatus$ = this.signInStatusSource.asObservable();

  private authProcessingSource = new BehaviorSubject<boolean>(false);
  authProcessingS$ = this.authProcessingSource.asObservable();

  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
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
  }

}
