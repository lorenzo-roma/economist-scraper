import React, {ReactNode} from "react";
import AuthData from "../../models/auth-data";

type ComponentProps = {onSubmit: (data:AuthData)=>void}
type ComponentState = {username: string, password: string}
export default class LoginForm extends React.Component<ComponentProps, ComponentState> {

    constructor(props:ComponentProps){
        super(props);
        this.state = {username:"", password:""}
    }

    render(): ReactNode {
        return (<div>
            <input type="email" onChange={this.handleUsernameChange} value={this.state.username}></input>
            <input type="password" onChange={this.handlePasswordChange} value={this.state.password}></input>
            <button onClick={this.handleFormSubmit}>Submit</button>
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