import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  constructor() {}

  setCookie(name: string, value: string) {
    localStorage.setItem(name, value);
  }

  getCookie(name: string) {
    return localStorage.getItem(name);
  }

  deleteCookie(name: string) {
    localStorage.removeItem(name);
  }
}
