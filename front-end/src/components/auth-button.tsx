import React, {ReactNode} from "react";
import { Link } from "react-router-dom";
import ServiceProvider from "../services/service-provider";
import LogoutButton from "./logout/logout-button";


export default class AuthButton extends React.Component {

    render(): ReactNode {
        const service = ServiceProvider.getAuthService();
        const isAuthenticated = service.getToken() != null;
        return isAuthenticated ? <div className="header-button"><LogoutButton /></div> : this.goToLogin();
    }

    goToLogin(): ReactNode {
        return (
            <div className="header-button">
                <Link to="/login">
                    Go to Login
                </Link>
            </div>
        );
    }

}