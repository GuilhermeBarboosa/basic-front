import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifierService {


  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  ShowSuccess(message: string) {
    this.toastr.success('', message, { timeOut: 3000});
  }

  ShowError(message: string) {
    this.toastr.error('', message, { timeOut: 3000});
  }

  ShowWarning(message: string) {
    this.toastr.warning('', message, { timeOut: 3000});
  }

  ShowInfo(message: string) {
    this.toastr.info(message);
  }



}
