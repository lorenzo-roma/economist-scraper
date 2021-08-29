import React, {ReactNode} from 'react';
import EconomistLogo from "./economist-logo";
import "../style/header.css";
import { Link } from 'react-router-dom';
import AuthButton from "../components/auth-button";

export default class Header extends React.Component {

    render(): ReactNode {
        return (
                <div className="row">
                    <Link to="/">
                        <EconomistLogo />
                    </Link>
                    <div className="fill header-side">
                        <AuthButton />
                    </div>
                </div>
        );
    }

}