import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

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
    data = data.split('/').reverse().join('/');
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
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return false;
    }

    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador1 = resto === 10 || resto === 11 ? 0 : resto;

    if (digitoVerificador1 !== parseInt(cpf.charAt(9))) {
      return false;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    let digitoVerificador2 = resto === 10 || resto === 11 ? 0 : resto;

    if (digitoVerificador2 !== parseInt(cpf.charAt(10))) {
      return false;
    }

    return true;
  }

  ordenarAlfabetico(array: any[]) {
    const compararEdital = (a: { edital: string }, b: { edital: string }) => {
      const editalA = a.edital.toLowerCase();
      const editalB = b.edital.toLowerCase();

      if (editalA < editalB) {
        return -1;
      }
      if (editalA > editalB) {
        return 1;
      }
      return 0;
    };

    return array.slice().sort(compararEdital);
  }

  getFormValidationErrors(form: any) {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control) {
        const controlErrors: ValidationErrors | null = control.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach((keyError) => {
            console.log(
              'Key control: ' +
                key +
                ', keyError: ' +
                keyError +
                ', err value: ',
              controlErrors[keyError]
            );
          });
        }
      }
    });
  }
}
