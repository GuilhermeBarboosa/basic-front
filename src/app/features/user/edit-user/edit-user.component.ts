import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/interfaces/dto/role';
import { User } from 'src/app/interfaces/dto/user';
import { UserInput } from 'src/app/interfaces/input/userInput';
import { EnderecoService } from 'src/app/routes/endereco.service';
import { RoleService } from 'src/app/routes/role.service';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/services/notifier.service';
import { UtilsService } from 'src/app/services/utils.service';

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
  @ViewChild('inputCep') inputCep!: ElementRef;

  constructor(
    private activedRouter: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private router: Router,
    private utils: UtilsService,
    private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private enderecoService: EnderecoService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.roleService.getAll().subscribe((data) => {
      var roleResponse = JSON.parse(JSON.stringify(data));
      this.roles = roleResponse;
    });

    this.userService.getById(this.id).subscribe((res) => {
      var userResponse = JSON.parse(JSON.stringify(res));

      userResponse.created = this.utils.formatarData(userResponse.created);
      userResponse.updated = this.utils.formatarData(userResponse.updated);

      this.user = userResponse;

      this.createTable();
    });

    this.renderer.listen('document', 'click', (event: Event) => {
      if (!this.inputCep.nativeElement.contains(event.target)) {
        this.onOutsideClick();
      }
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

  edit() {
    if (this.formulario.valid) {
      let userDTO = {
        name: this.formulario.get('name')?.value,
        cpf: this.formulario.get('cpf')?.value,
        email: this.formulario.get('email')?.value,
        telefone: this.formulario.get('telefone')?.value,
        cep: this.formulario.get('cep')?.value,
        rua: this.formulario.get('rua')?.value,
        cidade: this.formulario.get('cidade')?.value,
        bairro: this.formulario.get('bairro')?.value,
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
          this.notifier.showError(error.error);
          return;
        }
      );
    } else {
      this.notifier.showInfo('Preencha todos os campos!');
    }
  }

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
    this.router.navigateByUrl(`/user/info/${this.user?.id}`);
  }
}
