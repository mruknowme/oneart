import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AuthService } from '../services/auth.service';

@Injectable()
export class MaintenanceGuard implements CanActivate {

  // test: Observable<any>;
  test: Promise<boolean>;

  constructor(private authService: AuthService, private router: Router) {
  }



  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {


    return this.authService.getSiteStatus().then(response => {
      console.log(`response`, response);
      if (response) {
         return true;
      } else {
        this.router.navigate(['/maintenance']);
      }
    }).catch(err => {
      console.log(`err`, err);
      this.router.navigate(['/maintenance']);
      return false;
    });

  }
}
