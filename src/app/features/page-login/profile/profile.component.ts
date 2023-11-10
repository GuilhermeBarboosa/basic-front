import { User } from 'src/app/interface/dto/user';
import { JogadorService } from 'src/app/routes/jogador.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/routes/login.service';
import { Jogador } from 'src/app/interface/dto/jogador';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/shared/utils.service';
import { UserService } from '../../../routes/user.service';
import { JogadorRachaService } from '../../../routes/jogador-racha.service';
import { JogadorRacha } from 'src/app/interface/dto/jogador-racha';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private jogadorService: JogadorService,
    private router: Router,
    private jogadorRachaService: JogadorRachaService,
    private formBuilder: FormBuilder,
    private utils: UtilsService
  ) {}

  jogadorRacha: JogadorRacha[] = [];
  user?: User;
  jogador?: Jogador;
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

      this.jogadorService.getByUser(Number(data.id)).subscribe((res) => {
        var jogadorResponse = JSON.parse(JSON.stringify(res));
        this.jogador = jogadorResponse;

        this.createTableJogador();
      });

      this.jogadorRachaService.getByUser(Number(data.id)).subscribe((res) => {
        var jogadorResponse = JSON.parse(JSON.stringify(res));
        let arrayJogadores: JogadorRacha[] = [];


        jogadorResponse.forEach((element: any) => {
          element.nomeRacha = this.utils.formatterString(
            element.nomeRacha
          );
          arrayJogadores.push(element);
        });

        this.jogadorRacha = arrayJogadores;
      });
    }, error => {
      this.loginService.logout();
    });
  }


  createTable() {
    this.userForm = this.formBuilder.group({
      id: [{ value: this.user?.id, disabled: this.isDisabled }],
      nome: [
        { value: this.user?.nome, disabled: this.isDisabled },
        Validators.required,
      ],
      email: [
        { value: this.user?.email, disabled: this.isDisabled },
        Validators.required,
      ],
      idade: [
        { value: this.user?.idade, disabled: this.isDisabled },
        Validators.required,
      ],
      role: [
        { value: this.user?.idRole, disabled: this.isDisabled },
        Validators.required,
      ],
      telefone: [
        { value: this.user?.telefone, disabled: this.isDisabled },
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

  createTableJogador() {
    this.jogadorForm = this.formBuilder.group({

      posicao: [
        { value: this.jogador?.posicao, disabled: this.isDisabled },
        Validators.required,
      ],
      gols: [
        { value: this.jogador?.gols, disabled: this.isDisabled },
        Validators.required,
      ],
      assistencias: [
        { value: this.jogador?.assistencias, disabled: this.isDisabled },
        Validators.required,
      ],
    });
  }

  findInfo(idRacha: number, idQuadra:number ) {
    this.router.navigateByUrl(`quadra/racha/info/${idRacha}/${idQuadra}`);
  }
}
