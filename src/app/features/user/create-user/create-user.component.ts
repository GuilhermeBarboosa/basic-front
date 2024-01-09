import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/interfaces/dto/role';
import { User } from 'src/app/interfaces/dto/user';
import { UserInput } from 'src/app/interfaces/input/userInput';
import { RoleService } from 'src/app/routes/role.service';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { EnderecoService } from '../../../routes/endereco.service';
import { UtilsService } from 'src/app/shared/utils.service';

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
  @ViewChild('inputCep') inputCep!: ElementRef;
  @ViewChild('inputCpf') inputCpf!: ElementRef;

  constructor(
    private router: Router,
    private userService: UserService,
    private roleService: RoleService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private utilsService: UtilsService,
    private enderecoService: EnderecoService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe(
      (data) => {
        var roleResponse = JSON.parse(JSON.stringify(data));
        this.roles = roleResponse;

        this.createTable();
      },
      (error) => {
        this.notifier.showError(error.error);
      }
    );

    this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.inputCep.nativeElement.contains(event.target)) {
        this.onOutsideClick();
      }
    });
  }

  async createTable() {
    this.formulario = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(3)],
      ],
      telefone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(3)]],
      role: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.minLength(3)]],

      cep: ['', Validators.required],
      rua: ['', Validators.required],
      cidade: ['', Validators.required],
      bairro: ['', Validators.required],
    });
  }

  save() {
    if (this.formulario.valid) {
      let userDTO = {
        name: this.formulario.get('name')?.value,
        email: this.formulario.get('email')?.value,
        telefone: this.formulario.get('telefone')?.value,
        cpf: this.formulario.get('cpf')?.value,
        password: this.formulario.get('password')?.value,
        cep: this.formulario.get('cep')?.value,
        rua: this.formulario.get('rua')?.value,
        cidade: this.formulario.get('cidade')?.value,
        bairro: this.formulario.get('bairro')?.value,
        role: this.formulario.get('role')?.value,
      };

      let userInput = new UserInput(userDTO);

      this.userService.create(userInput).subscribe(
        (data) => {
          this.notifier.showSuccess('Usuário cadastrado com sucesso!');
          this.router.navigateByUrl('/user');
        },
        (error) => {
          this.notifier.showError(error.error);
        }
      );
    } else {
      this.notifier.showError('Formulário inválido!');
    }
  }

  // onValidateCpf(){
  //   let cpfDigitado = this.formulario.get('cpf')?.value;
  //   if (cpfDigitado != null && cpfDigitado != '') {
  //     if (!this.utilsService.validarCPF(cpfDigitado)) {
  //       this.notifier.showError('CPF inválido');
  //       console.log("cpf inválido")
  //       // this.formulario.get('cpf')?.setValue('');
  //     }
  //   }
  // }

  onOutsideClick() {
    let cep = this.formulario.get('cep')?.value;

    if (
      (cep != null && cep != '') ||
      (this.formulario.get('rua')?.value != null &&
        this.formulario.get('rua')?.value != '')
    ) {
      cep = cep.replace('-', '');
      this.enderecoService.findCep(this.formulario.get('cep')?.value).subscribe(
        (data) => {
          var enderecoResponse = JSON.parse(JSON.stringify(data));
          this.formulario.get('rua')?.setValue(enderecoResponse.street);
          this.formulario.get('cidade')?.setValue(enderecoResponse.city);
          this.formulario
            .get('bairro')
            ?.setValue(enderecoResponse.neighborhood);
        },
        (error) => {
          this.notifier.showError(error.error);
        }
      );
    }
  }

  return() {
    this.router.navigateByUrl('/user');
  }
}
