import React, {ReactNode} from "react";
import {Link} from "react-router-dom";


export default class SignupScreen extends React.Component {

    render(): ReactNode{
        return (
            <div>
                <h1>Signup</h1>
                <Link to="/login">To login</Link>
                <Link to="/">To list</Link>
            </div>
        );
    }

}