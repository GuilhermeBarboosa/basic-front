import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../routes/login.service';
import { CookieService } from '../services/cookie.service';
import { roles } from 'src/roles';
import { UtilsService } from '../services/utils.service';
import { NotifierService } from '../services/notifier.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  constructor(
    private loginService: LoginService,
    private cookieService: CookieService,
    private toast: NotifierService
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
      this.loginService.verifyToken().subscribe((res) => {
        this.loginService.obterClaims().subscribe((data) => {
          var response = JSON.parse(JSON.stringify(data));

          if (response.role != roles.ROLE_ADMIN) {
            this.toast.showError("Você não possui permissão")
            window.location.reload()
            return false;
          } else {
            return true;
          }
        });
      });
      // return true;
    }
    return false;
  }
}
