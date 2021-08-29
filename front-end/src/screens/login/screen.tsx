import React, { ReactNode } from "react";
import {Redirect} from "react-router-dom";
import LoginForm from "./login-form";
import ServiceProvider from "../../services/service-provider";
import LoginScreenState from "./states";
import AuthResult from "../../models/auth-result";
import AuthData from "../../models/auth-data";
import ServiceResponse from "../../models/service-response";
import AuthService from "../../services/auth-service/auth-service-interface";
import ServiceResponseStatus from "../../models/service-response-status";
import LoadingSpinner from "../../components/loading-spinner";

type ComponentProps = {};
type ComponentState = { current: LoginScreenState };
export default class LoginScreen extends React.Component<ComponentProps, ComponentState> {

    constructor(props: ComponentProps) {
        super(props);
        this.state = { current: LoginScreenState.WAITING_FOR_INPUT };
      }

    render(): ReactNode {
        return (
            <div className="center">
                <div className="column">
                <div className="text-bold mt-32 mb-16">Log in with <span className="text-bold-italic">The Economist</span></div>
                <LoginForm onSubmit={this.login}/>
                {this.loadContent()}
                </div>
            </div>
        );
    }

    login = async(data: AuthData)=>{
        const service: AuthService = ServiceProvider.getAuthService();
        this.setState({current: LoginScreenState.PERFORMING_LOGIN});
        const response : ServiceResponse<AuthResult>= await service.login(data);
        this.handleServiceResponse(response);
    }

    handleServiceResponse(response: ServiceResponse<AuthResult>) {
        switch (response.status) {
          case ServiceResponseStatus.SUCCESS: {
            this.setState({ current: LoginScreenState.LOGIN_COMPLETED });
            return;
          }
          case ServiceResponseStatus.UNAUTHORIZED: {
            this.setState({ current: LoginScreenState.LOGIN_FAILED });
            return;
          }
          default: {
            this.setState({ current: LoginScreenState.ERROR });
            return;
          }
        }
      }

      loadContent(): ReactNode {
        switch (this.state.current) {
            case LoginScreenState.LOGIN_FAILED:
                return "Wrong credentials";
          case LoginScreenState.LOGIN_COMPLETED:
            return <Redirect to="/" />;
          case LoginScreenState.WAITING_FOR_INPUT:
            return;
          case LoginScreenState.PERFORMING_LOGIN:
            return <LoadingSpinner />;
          case LoginScreenState.ERROR:
            return "Error";
        }
      }

}   