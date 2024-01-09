import { DefaultDto } from "./defaultDto";
import { Role } from "./role";

export interface User extends DefaultDto{
    name: string;
    cpf: string;
    email: string;
    telefone: string;
    password: string;
    cep: string;
    rua: string;
    cidade: string;
    bairro: string;
    idRole: number;
    role: string;
}
