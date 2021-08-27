import React, { ReactNode } from "react";
import {Link} from "react-router-dom";
import LoginForm from "./login-form";
import ServiceProvider from "../../services/service-provider";
import LoginScreenState from "./states";
import AuthResult from "../../models/auth-result";
import AuthData from "../../models/auth-data";
import ServiceResponse from "../../models/service-response";
import AuthService from "../../services/auth-service/auth-service-interface";

export default class LoginScreen extends React.Component {

    render(): ReactNode {
        return (
            <div>
                <h1>Login</h1>
                <Link to="/">To list</Link>
                <Link to="/signup">To signup</Link>
                <LoginForm onSubmit={this.login}/>
            </div>
        );
    }

    login = async(data: AuthData)=>{
        const service: AuthService = ServiceProvider.getAuthService();
        this.setState({current: LoginScreenState.PERFORMING_LOGIN});
        const response : ServiceResponse<AuthResult>= await service.login(data);
        console.log(response);
    }

}   