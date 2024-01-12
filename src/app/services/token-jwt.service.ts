import { LoginService } from 'src/app/routes/login.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TokenJwtService {
  constructor(private loginService: LoginService) {}

  setToken(token: any) {
    localStorage.setItem('token', token.token);
    localStorage.setItem('email', token.email);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRole(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.loginService.obterClaims().subscribe(
        (data: any) => {
          resolve(data.role);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

}
