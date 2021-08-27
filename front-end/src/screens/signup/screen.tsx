import React, { ReactNode } from "react";
import {Link} from "react-router-dom";
import SignupForm from "./signup-form";
import ServiceProvider from "../../services/service-provider";
import AuthResult from "../../models/auth-result";
import AuthData from "../../models/auth-data";
import ServiceResponse from "../../models/service-response";
import AuthService from "../../services/auth-service/auth-service-interface";
import SignupScreenState from "./states";

export default class SignupScreen extends React.Component {

    render(): ReactNode {
        return (
            <div>
                <h1>Signup</h1>
                <Link to="/">To list</Link>
                <Link to="/login">To login</Link>
                <SignupForm onSubmit={this.signup}/>
            </div>
        );
    }

    signup = async(data: AuthData)=>{
        const service: AuthService = ServiceProvider.getAuthService();
        this.setState({current: SignupScreenState.PERFORMING_SIGNUP});
        const response : ServiceResponse<AuthResult>= await service.signup(data);
        console.log(response);
    }

}   