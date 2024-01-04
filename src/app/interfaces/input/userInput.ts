export class UserInput {
  name: string | undefined;

  idade: number | undefined;

  cpf : string | undefined;

  email: string | undefined;

  password: string | undefined ;

  role : number | undefined;


  constructor(user: any) {
    this.name = user.name;
    this.cpf = user.cpf;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role!;
  }
}
