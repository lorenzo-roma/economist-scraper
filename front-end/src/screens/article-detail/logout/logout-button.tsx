import React, {ReactNode} from "react";
import { Redirect } from "react-router-dom";
import LoadingSpinner from "../../../components/loading-spinner";
import AuthService from "../../../services/auth-service/auth-service-interface";
import ServiceProvider from "../../../services/service-provider";
import LogoutState from "./logout-state";

type ComponentProps = {};
type ComponentState = {current: LogoutState}
export default class LogoutButton extends React.Component<ComponentProps, ComponentState> {


    constructor(props: ComponentProps) {
        super(props);
        this.state = {current: LogoutState.IDLE}
    }

    render(): ReactNode {
        return (
            <button onClick={this.handleButtonClick}>
                {this.loadContent()}
            </button>
        );
    }


    loadContent(): ReactNode {
        switch(this.state.current){
            case LogoutState.IDLE: return "Logout";
            case LogoutState.PERFORMING: return <LoadingSpinner />
            case LogoutState.COMPLETED: return <Redirect to="/" />
        }
    }

    handleButtonClick = ()=>{
        this.setState({current: LogoutState.PERFORMING});
        const service: AuthService = ServiceProvider.getAuthService();
        service.logout();
        this.setState({current: LogoutState.COMPLETED});
    }
}