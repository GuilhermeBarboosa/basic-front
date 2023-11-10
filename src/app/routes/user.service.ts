
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environment';
import { UserInput } from '../interfaces/input/userInput';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  });

  urlUser = `${environment.api}/user`;

  getById(id: number) {
    return this.http.get(`${this.urlUser}/` + id, {
      headers: this.HttpHeaders,
    });
  }

  findCpf(cpf: string) {
    return this.http.get(`${this.urlUser}/cpf/` + cpf, {
      headers: this.HttpHeaders,
    });
  }

  create(user: UserInput) {
    return this.http.post(`${this.urlUser}`, user, {
      headers: this.HttpHeaders,
    });
  }

  getAll() {
    return this.http.get(`${this.urlUser}`, { headers: this.HttpHeaders });
  }

  getAllInativo() {
    return this.http.get(`${this.urlUser}/desativado`, {
      headers: this.HttpHeaders,
    });
  }

  edit(user: UserInput, id: number) {
    return this.http.put(`${this.urlUser}/${id}`, user, {
      headers: this.HttpHeaders,
    });
  }

  ativar(user: UserInput, id: number) {
    return this.http.put(`${this.urlUser}/ativar/${id}`, user, {
      headers: this.HttpHeaders,
    });
  }

  delete(id: number) {
    return this.http.delete(`${this.urlUser}/${id}`, {
      headers: this.HttpHeaders,
    });
  }
}
