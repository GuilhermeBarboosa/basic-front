import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotifierService } from 'src/app/shared/notifier.service';
import { TokenJwtService } from 'src/app/shared/token-jwt.service';
import { LoginService } from 'src/app/routes/login.service';
import { LoginInput } from 'src/app/interfaces/input/loginInput';
import { CookieService } from '../../../routes/cookie.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private loginService: LoginService,
    private tokenJwtService: TokenJwtService,
    private cookieService: CookieService,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['gui@gmail.com', Validators.required],
      password: ['adm', Validators.required],
    });

    if (localStorage.getItem('email') != null) {
      this.loginForm.get('email')?.setValue(localStorage.getItem('email'));
      localStorage.removeItem('email');
    }
  }

  login() {
    if (this.loginForm.valid) {
      let loginInput = new LoginInput(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      );
      this.loginService.login(loginInput).subscribe(
        (data: any) => {
          var data = JSON.parse(JSON.stringify(data));
          this.tokenJwtService.setToken(data);
          this.loginService.obterClaims().subscribe(
            (data: any) => {
              var data = JSON.parse(JSON.stringify(data));
              this.cookieService.setCookie('role', data.role);
              this.notifier.showSuccess('Login efetuado com sucesso!');
              this.router.navigate(['/user']);
            },
            (error: any) => {
              this.notifier.showError('Login ou senha incorretos!');
            }
          );
        },
        (error: any) => {
          this.notifier.showError('Login ou senha incorretos!');
        }
      );
    }
  }
}
