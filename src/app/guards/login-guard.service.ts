import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../routes/login.service';
import { CookieService } from '../services/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService {
  constructor(
    private loginService: LoginService,
    private cookieService : CookieService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.verifyLogin(next, url);
  }
  verifyLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.loginService.isLogin()) {

      this.loginService.verifyToken().subscribe(
        (res) => {
          this.loginService.obterClaims().subscribe( (data) => {
            var response = JSON.parse(JSON.stringify(data));
          }, (err) => {
            this.loginService.logout();
          });
        },
        (err) => {
          this.loginService.logout();
        }
      );
      return true;
    }
    this.loginService.logout();
    return false;
  }
}
