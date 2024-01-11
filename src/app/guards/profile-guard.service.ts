import { Injectable } from '@angular/core';
import { LoginService } from '../routes/login.service';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NotifierService } from '../services/notifier.service';
import { Observable, of, switchMap } from 'rxjs';
import { TokenJwtService } from '../services/token-jwt.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuardService {
  constructor(
    private loginService: LoginService,
    private router: Router,
    private notifier: NotifierService,
    private token: TokenJwtService
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
    return this.checkUserLogin(next, url);
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): Observable<boolean> {
    return this.loginService.verifyToken().pipe(
      switchMap(() => {
        let idEdit = route.params['id'];

        return this.loginService.obterClaims().pipe(
          switchMap( async (res) => {
            let response = JSON.parse(JSON.stringify(res));
            let idLogin = response.id;
            let userRole = await this.token.getRole();

            if (userRole === 'ADMIN') {
              return true;
            } else {
              if (idLogin == idEdit) {
                return true;
              } else {
                window.history.back()
                this.notifier.showError('Você não tem permissão para acessar essa página');
                return false;
              }
            }
          })
        );
      })
    );
  }
}
