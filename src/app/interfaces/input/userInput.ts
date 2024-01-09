export class UserInput {
  name: string | undefined;

  cpf : string | undefined;

  email: string | undefined;

  telefone: string | undefined;

  password: string | undefined ;

  cep: string | undefined;

  rua: string | undefined;

  cidade: string | undefined;

  bairro: string | undefined;

  role : number | undefined;

  constructor(user: any) {
    this.name = user.name;
    this.cpf = user.cpf;
    this.email = user.email;
    this.telefone = user.telefone;
    this.password = user.password;
    this.cep = user.cep;
    this.rua = user.rua;
    this.cidade = user.cidade;
    this.bairro = user.bairro;
    this.role = user.role!;
  }
}
