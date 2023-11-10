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

  formatterString(string: String) {
    string = string.toLowerCase();
    string = string.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
      letra.toUpperCase()
    );

    return string;
  }
}
