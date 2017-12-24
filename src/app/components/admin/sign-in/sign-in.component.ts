import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from './../../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class SignInComponent implements OnInit {

  email: string;
  password: string;

  signInForm: FormGroup;

  signInStatus: any;

  processing = false;

  constructor(public authService: AuthService, private fb: FormBuilder) {
    this.authService.signInStatus$.subscribe(status => this.signInStatus = status);
    this.authService.authProcessingS$.subscribe(status => this.processing = status);
    this.createSignInForm();
  }

  createSignInForm() {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  signup() {
    this.authService.signup(this.email, this.password);
    this.email = this.password = '';
  }

  login() {
    this.authService.login(this.email, this.password);
    this.email = this.password = '';
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
  }

}
