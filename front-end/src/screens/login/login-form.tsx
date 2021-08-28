import React, {ReactNode} from "react";
import AuthData from "../../models/auth-data";
import "../../style/form.css";


type ComponentProps = {onSubmit: (data:AuthData)=>void}
type ComponentState = {username: string, password: string}
export default class LoginForm extends React.Component<ComponentProps, ComponentState> {

    constructor(props:ComponentProps){
        super(props);
        this.state = {username:"", password:""}
    }

    render(): ReactNode {
        return (<div className="column form">
            <div>
            Email address <br></br>
            <input type="email" onChange={this.handleUsernameChange} value={this.state.username}></input>
            </div>
            <div className="mt-16">
            Password <br></br>
            <input type="password" onChange={this.handlePasswordChange} value={this.state.password}></input>
            </div>
            <div className="row">
                <div>Not registered? Register now</div>
            <div onClick={this.handleFormSubmit}>Submit</div>
            </div>
        </div>);
    }

    handleUsernameChange= (el: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({username : el.target.value});
    }

    handlePasswordChange = (el: React.ChangeEvent<HTMLInputElement>)=>{
        this.setState({password : el.target.value});
    }

    handleFormSubmit = ()=>{
        this.props.onSubmit({username: this.state.username, password: this.state.password});
    }

}