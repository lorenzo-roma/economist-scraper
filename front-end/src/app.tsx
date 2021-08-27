import React, {ReactNode} from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ArticleDetailScreen from "./screens/article-detail/screen";
import ArticleListScreen from "./screens/article-list/screen";
import LoginScreen from "./screens/login/screen";
import SignupScreen from "./screens/signup/screen";

export default class App extends React.Component {
    
    render(): ReactNode {
        return(
            <BrowserRouter>
                <Switch>
                    <Route exact path="/"><ArticleListScreen /></Route>
                    <Route path="/detail"><ArticleDetailScreen /></Route>
                    <Route path="/login"><LoginScreen /></Route>
                    <Route path="/signup"><SignupScreen /></Route>
                </Switch>
            </BrowserRouter>
        );
    }

}