import React, {ReactNode} from "react";
import "../style/loader.css";

export default class LoadingSpinner extends React.Component {

    render(): ReactNode {
        return (
            <div className="center">
                <div className="loader"></div>
            </div>
        );
    }

}