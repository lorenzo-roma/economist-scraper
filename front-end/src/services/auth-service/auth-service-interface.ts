import ServiceResponse from "../../models/service-response";
import AuthResult from "../../models/auth-result";
import AuthData from "../../models/auth-data";


export default interface AuthService {
    getToken(): string | undefined;
    login(data: AuthData): Promise<ServiceResponse<AuthResult>>
    signup(data: AuthData): Promise<ServiceResponse<AuthResult>>
    logout(): Promise<void>
}