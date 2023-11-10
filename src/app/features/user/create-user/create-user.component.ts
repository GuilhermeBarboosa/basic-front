import { NotifierService } from 'src/app/shared/notifier.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from 'src/app/routes/role.service';
import { Role } from 'src/app/interfaces/dto/role';
import { User } from 'src/app/interfaces/dto/user';
import { UserService } from 'src/app/routes/user.service';
import { UserInput } from 'src/app/interfaces/input/userInput';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  user!: User;
  roles?: Role[];
  formulario!: FormGroup;
  Sim = 'Sim';
  Nao = 'Não';

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.roles = roleResponse;

        this.createTable();
      },
      (error) => {
        this.notifier.ShowError(error.error);
      }
    );
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      idade: [
        '',
        [Validators.required, Validators.min(14), Validators.max(70)],
      ],
      role: ['', Validators.required],
      telefone: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save() {
    console.log(this.formulario);

    if (this.formulario.valid) {
      let userDTO = {
        nome: this.formulario.get('nome')?.value,
        email: this.formulario.get('email')?.value,
        senha: this.formulario.get('senha')?.value,
        idade: this.formulario.get('idade')?.value,
        telefone: this.formulario.get('telefone')?.value,
        cpf: this.formulario.get('cpf')?.value,
        role: this.formulario.get('role')?.value,
      };

      let userInput = new UserInput(userDTO);

      this.userService.create(userInput).subscribe(
        (data) => {
          this.notifier.ShowSuccess('Usuário cadastrado com sucesso!');
          this.router.navigateByUrl('/user');
        },
        (error) => {
          this.notifier.ShowError(error.error);
        }
      );
    } else {
      console.log(this.formulario);
      this.notifier.ShowError('Formulário inválido!');
    }
  }

  return() {
    this.router.navigateByUrl('/user');
  }
}
