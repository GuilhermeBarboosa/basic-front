import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/routes/login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/utils.service';
import { UserService } from '../../../routes/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/dto/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private router: Router,
    private formBuilder: FormBuilder,
    private utils: UtilsService
  ) {}

  user?: User;
  userForm!: FormGroup;
  jogadorForm! : FormGroup;
  isDisabled = true;

  ngOnInit() {
    this.loginService.obterClaims().subscribe((res) => {
      var data = JSON.parse(JSON.stringify(res));
      this.userService.getById(Number(data.id)).subscribe((res) => {
        var userResponse = JSON.parse(JSON.stringify(res));
        this.user = userResponse;

        this.user!.created = this.utils.formatarData(
          this.user!.created
        );

        this.user!.updated = this.utils.formatarData(
          this.user!.updated
        );

        this.createTable();
      });

    }, error => {
      this.loginService.logout();
    });
  }


  createTable() {
    this.userForm = this.formBuilder.group({
      id: [{ value: this.user?.id, disabled: this.isDisabled }],
      name: [
        { value: this.user?.name, disabled: this.isDisabled },
        Validators.required,
      ],
      email: [
        { value: this.user?.email, disabled: this.isDisabled },
        Validators.required,
      ],
      telefone: [
        { value: this.user?.telefone, disabled: this.isDisabled },
        Validators.required,
      ],
      rua: [
        { value: this.user?.rua, disabled: this.isDisabled },
        Validators.required,
      ],
      cidade: [
        { value: this.user?.cidade, disabled: this.isDisabled },
        Validators.required,
      ],
      bairro: [
        { value: this.user?.bairro, disabled: this.isDisabled },
        Validators.required,
      ],
      cep: [
        { value: this.user?.cep, disabled: this.isDisabled },
        Validators.required,
      ],
      role: [
        { value: this.user?.idRole, disabled: this.isDisabled },
        Validators.required,
      ],
      cpf: [
        { value: this.user?.cpf, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.user?.created, disabled: this.isDisabled },
        Validators.required,
      ],
      updated: [
        { value: this.user?.updated, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }


  findInfo(idRacha: number, idQuadra:number ) {
    this.router.navigateByUrl(`quadra/racha/info/${idRacha}/${idQuadra}`);
  }
}
