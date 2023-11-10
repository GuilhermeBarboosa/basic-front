import { LoginService } from 'src/app/routes/login.service';
import { Injectable } from '@angular/core';
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
}
