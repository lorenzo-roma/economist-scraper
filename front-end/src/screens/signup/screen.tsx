import React, { ReactNode } from "react";
import {Link, Redirect} from "react-router-dom";
import SignupForm from "./signup-form";
import ServiceProvider from "../../services/service-provider";
import AuthResult from "../../models/auth-result";
import AuthData from "../../models/auth-data";
import ServiceResponse from "../../models/service-response";
import AuthService from "../../services/auth-service/auth-service-interface";
import SignupScreenState from "./states";
import ServiceResponseStatus from "../../models/service-response-status";
import LoadingSpinner from "../../components/loading-spinner";

type ComponentProps = {}
type ComponentState = {current: SignupScreenState}
export default class SignupScreen extends React.Component<ComponentProps, ComponentState> {

    constructor(props: ComponentProps) {
        super(props);
        this.state = {current:SignupScreenState.WAITING_FOR_INPUT};
    }

    render(): ReactNode {
        return (
            <div>
                <h1>Signup</h1>
                <Link to="/">To list</Link>
                <Link to="/login">To login</Link>
                <SignupForm onSubmit={this.signup}/>
                {this.loadContent()}
            </div>
        );
    }

    signup = async(data: AuthData)=>{
        const service: AuthService = ServiceProvider.getAuthService();
        this.setState({current: SignupScreenState.PERFORMING_SIGNUP});
        const response : ServiceResponse<AuthResult>= await service.signup(data);
        this.handleServiceResponse(response);
    }


    handleServiceResponse(response: ServiceResponse<AuthResult>){
        switch(response.status){
            case ServiceResponseStatus.SUCCESS:{
                this.setState({current: SignupScreenState.SIGNUP_COMPLETED});
                return;
            }
            default:{
                this.setState({current: SignupScreenState.ERROR});
                return;
            }
        }
    }

    loadContent():ReactNode {
        switch(this.state.current){
            case SignupScreenState.SIGNUP_COMPLETED:
                return <Redirect to="/" />
            case SignupScreenState.WAITING_FOR_INPUT:
                return ;
            case SignupScreenState.PERFORMING_SIGNUP:
                return <LoadingSpinner />
            case SignupScreenState.ERROR:
                return "Error";
        }
    }
    
}   