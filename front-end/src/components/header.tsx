import React, {ReactNode} from 'react';
import EconomistLogo from "./economist-logo";
import "../style/header.css";

export default class Header extends React.Component {

    render(): ReactNode {
        return (
            <div className="header">
                <EconomistLogo />
            </div>
        );
    }

}