import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  getById(id: number) {
    return this.http.get(`${environment.api}/role/` + id);
  }

  getAll() {
    return this.http.get(`${environment.api}/role`);
  }

}
