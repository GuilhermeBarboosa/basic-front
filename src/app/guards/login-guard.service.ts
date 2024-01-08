import { Observable } from 'rxjs';
import { NotifierService } from './../shared/notifier.service';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../routes/login.service';
import { CookieService } from '../routes/cookie.service';

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
      this.loginService.obterClaims().subscribe( (data) => {
        var response = JSON.parse(JSON.stringify(data));
        this.cookieService.setCookie('role', response.role);
      });
      return true;
    }
    this.loginService.logout();
    return false;
  }
}
