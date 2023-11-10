
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interface/dto/user';
import { PosicaoService } from 'src/app/routes/posicao.service';
import { Posicao } from 'src/app/interface/dto/posicao';
import { UserService } from 'src/app/routes/user.service';
import { NotifierService } from 'src/app/shared/notifier.service';
import { UserInput } from 'src/app/interface/input/userInput';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private posicaoService : PosicaoService,
    private notifier: NotifierService) { }

  user!: User;
  formulario!: FormGroup;
  posicaoArray = [] as Posicao[];

  ngOnInit() {
    this.posicaoService.getAll().subscribe( (data) => {
        var posicaoResponse = JSON.parse(JSON.stringify(data));
        let array = posicaoResponse;

        array.forEach((posicao: Posicao) => {
          if(posicao.id! != 1){
            this.posicaoArray.push(posicao);
          }
        }
      )
    });


    this.formulario = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      idade: ['', [Validators.required, Validators.min(14), Validators.max(70)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(3)]],
      senhaSecundaria: ['', [Validators.required, Validators.minLength(3)]],
      telefone: ['', [Validators.required, Validators.minLength(8)]],
      cpf: ['', [Validators.required, Validators.minLength(11)]],
      posicao: ['', Validators.required],
      role: [2, Validators.required]
    })
  }

  registrar(){
    if(this.formulario.get('senha')?.value != this.formulario.get('senhaSecundaria')?.value){
      this.notifier.ShowError('As senhas não coincidem!');
    }else{
      if(this.formulario.valid) {

        let userDTO = {
          nome: this.formulario.get('nome')?.value,
          idade: this.formulario.get('idade')?.value,
          telefone: this.formulario.get('telefone')?.value,
          cpf: this.formulario.get('cpf')?.value,
          email: this.formulario.get('email')?.value,
          senha: this.formulario.get('senha')?.value,
          posicao: this.formulario.get('posicao')?.value,
          role: this.formulario.get('role')?.value
        }

        let userInput = new UserInput(userDTO);


        this.userService.create(userInput).subscribe(
          (data) => {
            this.notifier.ShowSuccess('Usuário cadastrado com sucesso!');

            localStorage.setItem('email', userDTO.email);

            this.router.navigateByUrl('/authentication/login');
          },
          (error) => {
            this.notifier.ShowError(error.error);
          }
        );

      } else {
        this.notifier.ShowError('Formulário inválido!');
      }
    }

  }

}
