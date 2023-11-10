import { DefaultDto } from "./defaultDto";
import { Role } from "./role";

export interface User extends DefaultDto{
    nome: string;
    idade: number;
    telefone: string;
    cpf: string;
    email: string;
    senha: string;
    idRole: number;
    role: string;
}
