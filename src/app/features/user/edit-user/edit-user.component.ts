import { NotifierService } from 'src/app/shared/notifier.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/routes/role.service';
import { UtilsService } from 'src/app/shared/utils.service';
import { User } from 'src/app/interfaces/dto/user';
import { Role } from 'src/app/interfaces/dto/role';
import { UserService } from 'src/app/routes/user.service';
import { UserInput } from 'src/app/interfaces/input/userInput';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  formulario!: FormGroup;
  user?: User;
  roles?: Role[];
  isDisabled = false;
  id = this.activedRouter.snapshot.params['id'];
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private activedRouter: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe((data) => {
      var roleResponse = JSON.parse(JSON.stringify(data));
      this.roles = roleResponse;
    });

    this.userService.getById(this.id).subscribe((res) => {
      var userResponse = JSON.parse(JSON.stringify(res));

      userResponse.created = this.utils.formatarData(
        userResponse.created
      );
      userResponse.updated = this.utils.formatarData(
        userResponse.updated
      );

      this.user = userResponse;

      this.createTable();
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      id: [{ value: this.user?.id, disabled: true }],
      name: [
        { value: this.user?.name, disabled: this.isDisabled },
        Validators.required,
      ],
      email: [
        { value: this.user?.email, disabled: this.isDisabled },
        Validators.required,
      ],
      password: [{ value: '', disabled: this.isDisabled }, Validators.required],

      role: [
        { value: this.user?.idRole, disabled: this.isDisabled },
        Validators.required,
      ],
      cpf : [
        { value: this.user?.cpf, disabled: this.isDisabled },
        Validators.required,
      ],
      created: [
        { value: this.user?.created, disabled: true },
        Validators.required,
      ],
      updated: [
        { value: this.user?.updated, disabled: true },
        Validators.required,
      ],
    });
  }

  edit() {
    if (this.formulario.valid) {
      let userDTO = {
        name: this.formulario.get('name')?.value,
        cpf: this.formulario.get('cpf')?.value,
        email: this.formulario.get('email')?.value,
        password: this.formulario.get('password')?.value,
        role: this.formulario.get('role')?.value,
      };

      let userInput = new UserInput(userDTO);

      this.userService.edit(userInput, this.user!.id!).subscribe(
        (data) => {
          this.notifier.showSuccess('Usuário atualizado com sucesso!');
          this.router.navigateByUrl(`/user`);
        },
        (error) => {
          console.log(error)
          this.notifier.showError(error.error);
          return;
        }
      );
    } else {
      this.notifier.showInfo('Preencha todos os campos!');
    }
  }

  return() {
    this.router.navigateByUrl(`/user/info/${this.user?.id}`);
  }
}
