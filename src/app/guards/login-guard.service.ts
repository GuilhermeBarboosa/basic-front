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

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private notifier: NotifierService
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
      return true;
    }
    this.loginService.logout();
    return false;
  }
}
