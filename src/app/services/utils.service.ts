import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  formatarData(data: any) {
    const date = new Date(data);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formatted = `${day}/${month}/${year}`;
    return formatted;
  }

  formatarDataToSQL(data: any) {
    data = data.split("/").reverse().join("/");
    data = new Date(data);
    return data;
  }

  formatterString(string: string) {
    string = string.toLowerCase();
    string = string.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
      letra.toUpperCase()
    );

    return string;
  }

  validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false; // Retorna falso se o CPF não tiver 11 dígitos ou se for composto por uma sequência repetida de números
    }

    // Validação do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return false; // Retorna falso se o primeiro dígito verificador não for válido
    }

    // Validação do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
      return false; // Retorna falso se o segundo dígito verificador não for válido
    }

    return true; // Retorna verdadeiro se o CPF for válido
  }
}
