import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnderecoService {

constructor(   private http: HttpClient,) { }


  findCep(cep: string) {
   return this.http.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);
  }

}
