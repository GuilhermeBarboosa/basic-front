import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NotifierService } from '../shared/notifier.service';
import { LoginService } from '../routes/login.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService  {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private notifier: NotifierService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.loginService.verifyToken()) {

      const userRole = localStorage.getItem('role');
      const roleJson = JSON.parse(JSON.stringify(route.data));

      if (roleJson.role != userRole) {
        this.router.navigate(['/home']);
        this.notifier.ShowError("Você não tem permissão para acessar essa página");
        return false;
      }
      return true;
    }

    this.router.navigate(['/home']);
    return false;
  }
}
