import React, {ReactNode} from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ArticleDetailScreen from "./screens/article-detail/screen";
import ArticleListScreen from "./screens/article-list/screen";
import LoginScreen from "./screens/login/screen";
import SignupScreen from "./screens/signup/screen";
import Header from "./components/header";
import "./style/general.css"

export default class App extends React.Component {
    
    render(): ReactNode {
        return(
            <div className="wrapper">
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">{this.withHeader(<ArticleListScreen />)}</Route>
                    <Route path="/detail">{this.withHeader(<ArticleDetailScreen />)}</Route>
                    <Route path="/login">{this.withHeader(<LoginScreen />)}</Route>
                    <Route path="/signup">{this.withHeader(<SignupScreen />)}</Route>
                </Switch>
            </BrowserRouter>
            </div>
        );
    }

    withHeader(node: ReactNode): ReactNode {
        
        return (
        <div>
            <Header />
            {node}
        </div>
        );

    }

}