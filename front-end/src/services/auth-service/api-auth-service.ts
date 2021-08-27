import AuthResult from "../../models/auth-result";
import ServiceResponse from "../../models/service-response";
import ServiceProvider from "../service-provider";
import AuthService from "./auth-service-interface";
import Config from "../../config/config";
import APIResponse from "../../models/api-response";
import AuthData from "../../models/auth-data";
import ServiceResponseStatus from "../../models/service-response-status";

export default class APIAuthService implements AuthService {

    token?: string;

    async signup(data: AuthData): Promise<ServiceResponse<AuthResult>> {
        const url = `${Config.apiBaseUrl}/auth/signup`;
        try{
            const service = ServiceProvider.getAPIService();
            const response: APIResponse = await service.makeRequest(url, "POST", {username: data.username, password: data.password});
            return this.handleAPIServiceResponse(response);
        } catch (e){
                return {status: ServiceResponseStatus.ERROR}
        }
    }

    async login(data: AuthData): Promise<ServiceResponse<AuthResult>> {
        const url = `${Config.apiBaseUrl}/auth/login`;
        try{
            const service = ServiceProvider.getAPIService();
            const response: APIResponse = await service.makeRequest(url, "POST", {username: data.username, password: data.password});
            return this.handleAPIServiceResponse(response);
        } catch (e){
                return {status: ServiceResponseStatus.ERROR}
        }
    }

    async logout(): Promise<void>{
        this.token = undefined;
    }

    getToken(): string | undefined {
        return this.token;
    }

    handleAPIServiceResponse(response: APIResponse){
        switch(response.code){
            case 403: return {status: ServiceResponseStatus.UNAUTHORIZED};
            case 500: return {status: ServiceResponseStatus.ERROR}
            case 200: {
                if(response.data.token) this.token = response.data.token;
                return {status: ServiceResponseStatus.SUCCESS, data: response.data};
            } 
        }
        return {status: ServiceResponseStatus.ERROR}
    }


        
}