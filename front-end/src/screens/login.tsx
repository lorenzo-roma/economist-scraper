import React, { ReactNode } from "react";
import {Link} from "react-router-dom";

export default class LoginScreen extends React.Component {

    render(): ReactNode {
        return (
            <div>
                <h1>Login</h1>
                <Link to="/">To list</Link>
                <Link to="/signup">To signup</Link>
            </div>
        );
    }

}   