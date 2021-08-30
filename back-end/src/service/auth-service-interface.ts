import AuthResult from "../model/auth-result";
import User from "../model/user";


export default interface AuthService {
    signUp(user: User): Promise<AuthResult>,
    logIn(user: User): Promise<AuthResult>,
    getToken(user: User): string,
    verifyToken(token: string): User
}