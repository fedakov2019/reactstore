import { IToken } from "../IToken";
import { IUser } from "../IUser";

export interface AuthResponse{
    token_mod:IToken;
    createdCUs:IUser;

}